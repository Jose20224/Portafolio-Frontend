# Paquete de integración — Portafolio Frontend + Backend

## Contenido

- `frontend-patch/`: archivos nuevos y reemplazos de `Portafolio-Frontend`.
- `backend-patch/backend/src/app.module.ts`: registra el módulo CRUD administrativo que ya existía pero no estaba incluido en `AppModule`.
- `apply-patch.ps1`: aplica ambos conjuntos de archivos a dos repositorios locales separados.

## Aplicación en Windows PowerShell

1. Descarga y extrae este ZIP en una carpeta temporal.
2. Abre PowerShell en la carpeta donde quedó `apply-patch.ps1`.
3. Ejecuta, sustituyendo las rutas por las rutas reales en tu equipo:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\apply-patch.ps1 -FrontendPath "C:\ruta\a\Portafolio-Frontend" -BackendPath "C:\ruta\a\Portafolio-Backend"
```

El script valida que ambas carpetas tengan la estructura esperada. No toca `package.json`, `package-lock.json` ni tus archivos `.env` existentes.

## Configuración obligatoria

En `Portafolio-Frontend`, crea o actualiza `.env.local`:

```env
VITE_API_BASE_URL=https://URL-REAL-DE-RENDER/api/v1
```

Usa la URL exacta del servicio Render del backend. La URL no se incluye en el parche porque no fue compartida y no debe adivinarse.

En Vercel, agrega `VITE_API_BASE_URL` con el mismo valor y vuelve a desplegar.

## Validación después de aplicar

Frontend, desde la raíz del repositorio:

```powershell
npm ci
npm run lint
npm run build
```

Backend, desde `Portafolio-Backend\backend`:

```powershell
npm ci
npm run typecheck
npm run build
```

Publica primero el cambio del backend para que Render exponga `/api/v1/admin/portfolio/*`. Luego publica el frontend y configura Vercel.

## Cambios incorporados

- Cliente HTTP centralizado, errores uniformes, Bearer token y renovación de sesión ante 401.
- Contexto de autenticación administrativa y rutas protegidas.
- Panel responsive con inicio de sesión, resumen, proyectos, categorías, mensajes, perfil, redes, habilidades y biblioteca multimedia.
- Conexión del formulario público de contacto con `POST /api/v1/contact/messages`, honeypot y marca de tiempo anti-spam.
- Lectura de perfil, enlaces sociales, habilidades, categorías y proyectos publicados desde endpoints públicos.
- `AdminPortfolioModule` agregado a los imports del `AppModule` del backend.

La sesión usa `sessionStorage` y el backend valida siempre el token y el rol. El estado “Respondido” no envía un correo: solo actualiza el registro; se proporciona un enlace `mailto:` para que el administrador responda desde su cliente de correo.
