import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { adminRequest, apiRequest, clearSession, readSession, saveSession } from '../services/api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(false);

  const refreshUser = useCallback(async () => {
    const session = readSession();
    if (!session?.accessToken) {
      setUser(null);
      setReady(true);
      return null;
    }
    setChecking(true);
    try {
      const result = await adminRequest('/admin/session');
      setUser(result.user);
      return result.user;
    } catch (error) {
      clearSession();
      setUser(null);
      if (error.status !== 401 && error.status !== 403) console.error('No se pudo validar la sesión administrativa:', error);
      return null;
    } finally {
      setChecking(false);
      setReady(true);
    }
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  const login = useCallback(async (email, password) => {
    const result = await apiRequest('/auth/login', { method: 'POST', body: { email, password } });
    saveSession(result);
    setUser(result.user);
    setReady(true);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try { await adminRequest('/auth/logout', { method: 'POST' }); }
    finally { clearSession(); setUser(null); }
  }, []);

  const value = useMemo(() => ({ user, ready, checking, login, logout, refreshUser, request: adminRequest }), [user, ready, checking, login, logout, refreshUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return value;
}
