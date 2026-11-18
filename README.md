# Restauración del inicio y validación del perfil

Comparado con el commit anterior a la integración: `9fcacda3a26c3e2e2d423c463ff6edbc489fc84e`.
Base de trabajo: `5fdb86d14fe9def0ea6b4927d3b5107a81982428` (main, 18-11-2026).

## Cambios
- Hero: restaura la composición a dos columnas, tarjeta de imagen grande, resplandor, badge flotante, botones, enlaces sociales y animaciones escalonadas. Usa el perfil y enlaces desde la API, y `src/assets/hero.png` como imagen de respaldo.
- Proyectos destacados: restaura fondo decorativo, encabezado centrado, animaciones escalonadas, tarjetas y enlace a todos los proyectos, consumiendo proyectos desde PortfolioContext.
- Sobre mí: recupera la animación de la tarjeta interior sin quitar el contenido dinámico.
- Administrador: cada textarea de `about_paragraphs` limita a 500 caracteres y muestra contador; elimina espacios al guardar.

## Aplicar
Desde la carpeta extraída:

```powershell
python .\apply.py "C:\\RUTA\\Portafolio-Frontend"
```

El script genera respaldos `.jsx.bak` en el frontend. No los incluyas en el commit.

```powershell
cd C:\\RUTA\\Portafolio-Frontend
npm ci
npm run build
npm run lint
git status
```

Comprueba el resultado antes de hacer `git add` y `git commit`. Si el build o lint falla, no publiques.

## Nota
- El `401` de `/auth/login` indica credenciales no aceptadas en ese intento; no es un error de animación.
- Un `404` sin URL completa no permite identificar la causa.
- El formulario todavía depende de las demás validaciones del backend (por ejemplo, longitud máxima de fortalezas).
- Este parche no cambia secretos, rutas de autenticación, ni datos en Supabase.
