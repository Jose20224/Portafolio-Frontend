const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
const SESSION_KEY = 'portfolio.admin.session';

export class ApiError extends Error {
  constructor(message, status = 0, payload = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export function isApiConfigured() {
  return Boolean(API_BASE_URL);
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function readSession() {
  try {
    const value = sessionStorage.getItem(SESSION_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function getErrorMessage(payload, fallback) {
  if (typeof payload?.message === 'string') return payload.message;
  if (Array.isArray(payload?.message)) return payload.message.join(' ');
  return fallback;
}

async function parseResponse(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new ApiError('Falta configurar VITE_API_BASE_URL en el frontend.', 0);
  }

  const { token, body, headers = {}, ...fetchOptions } = options;
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');
  if (body !== undefined && !(body instanceof FormData)) requestHeaders.set('Content-Type', 'application/json');
  if (token) requestHeaders.set('Authorization', `Bearer ${token}`);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      ...fetchOptions,
      headers: requestHeaders,
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
      credentials: 'omit',
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Comprueba tu conexión y la URL del backend.', 0);
  }

  const payload = await parseResponse(response);
  if (!response.ok) {
    throw new ApiError(getErrorMessage(payload, `Error HTTP ${response.status}`), response.status, payload);
  }
  return payload;
}

let refreshPromise = null;

async function refreshStoredSession() {
  const session = readSession();
  if (!session?.refreshToken) {
    clearSession();
    throw new ApiError('La sesión expiró. Inicia sesión nuevamente.', 401);
  }
  if (!refreshPromise) {
    refreshPromise = apiRequest('/auth/refresh', {
      method: 'POST',
      body: { refreshToken: session.refreshToken },
    }).then((nextSession) => {
      saveSession(nextSession);
      return nextSession;
    }).catch((error) => {
      clearSession();
      throw error;
    }).finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}

export async function adminRequest(path, options = {}) {
  let session = readSession();
  if (!session?.accessToken) throw new ApiError('Necesitas iniciar sesión para continuar.', 401);

  try {
    return await apiRequest(path, { ...options, token: session.accessToken });
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error;
    session = await refreshStoredSession();
    return apiRequest(path, { ...options, token: session.accessToken });
  }
}
