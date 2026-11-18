# Portafolio — Frontend

Aplicación React 19 + Vite con sitio público y panel administrativo.

## Configuración

Crea `.env.local` desde `.env.example` y coloca la URL real del backend NestJS:

```env
VITE_API_BASE_URL=https://TU-SERVICIO.onrender.com/api/v1
```

El archivo `vercel.json` mantiene funcionando las rutas del sitio y del panel al abrirlas directamente. En Vercel, registra esa misma variable en el entorno Production y vuelve a desplegar. No publiques `SUPABASE_SECRET_KEY`, `service_role` ni otras credenciales secretas en variables `VITE_`.

## Desarrollo

```powershell
npm ci
npm run dev
```

## Rutas administrativas

- `/admin/login`
- `/admin`
- `/admin/proyectos`
- `/admin/mensajes`
- `/admin/perfil`
- `/admin/archivos`

El panel no crea administradores. Debe existir un usuario en Supabase Auth con entrada activa en `public.admin_users` y rol `owner` o `editor`.
