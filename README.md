# Mejoras para creación y edición de proyectos — Portafolio-Frontend

## Revisión realizada

Comparación del frontend `main` (18-nov-2026, commit b1bb1e18) con la versión anterior a su integración con backend (commit `9fcacda3`). Se contrastó también el contrato real de `Portafolio-Backend` (`AdminPortfolioController`, `AdminPortfolioDto` y `PublicPortfolioService`).

El editor anterior solo persistía el registro principal (`projects`) y omitía editar sus relaciones (`project_technologies`, `project_highlights` y `project_collaborators`). La ficha pública antigua sí mostraba tecnología clave, características y equipo, que se perdieron al simplificar `ProjectDetail.jsx`.

## Qué mejora este paquete

- Formulario organizado en bloques: información básica, tecnologías, características, colaboradores, URLs, imágenes y visibilidad.
- Tecnologías: al menos una. La **primera** es la tecnología clave de la ficha pública. Botones para subir/bajar de orden. Cada una acepta nombre y uso/rol (opcional).
- Características clave: múltiples elementos opcionales.
- Colaboradores: opción activable. Cada uno requiere nombre y permite rol, GitHub, LinkedIn y ruta de imagen opcionales.
- URL de demo y GitHub: ambas opcionales e independientes. Sin demo pública se muestra una nota en la ficha en lugar de un botón inservible.
- Imágenes de tarjeta y portada: opcionales. Se pueden elegir de la biblioteca multimedia ya existente, que utiliza la carpeta `projects` de Supabase Storage; el editor guarda rutas, no URLs.
- Proyectos nuevos: se crean como borradores y se publican desde el listado. La marca Destacado no publica automáticamente.
- Ficha pública con tecnología clave, estado, descripción, características, tecnologías y colaboradores (solo si existen), además del manejo de demo no publicada.
- La vista de detalle recupera movimiento sutil y encabezado con metadatos, sin volver a datos de prototipos inventados.
- Sin dependencias nuevas ni modificaciones al backend o a la base de datos.

## Instalación

Copia el contenido de `src/` sobre el `src/` de tu frontend **o** desde PowerShell ejecuta:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\INSTALAR.ps1 -FrontendPath "C:\RUTA\Portafolio-Frontend"
```

El instalador conserva una copia de las versiones anteriores en `backups-admin-AAAA...` fuera de `src`. No debes subir esa carpeta al repositorio.

Luego:

```powershell
cd "C:\RUTA\Portafolio-Frontend"
npm ci
npm run lint
npm run build
npm run dev
```

Prueba `/admin/proyectos`: crea una categoría (si no tienes), crea un proyecto con al menos una tecnología, añade dos características y dos colaboradores, guárdalo. Entra a editar y confirma los registros. Publica y verifica la ficha en `/proyecto/slug`. Prueba otro sin colaboradores ni demo y confirma el mensaje informativo.

## Notas técnicas

### Endpoints ya implementados en el backend

- `POST|PATCH /api/v1/admin/portfolio/projects[/:id]`
- `GET /api/v1/admin/portfolio/projects/:id`
- `GET|POST|PATCH|DELETE /api/v1/admin/portfolio/projects/:id/technologies[/:childId]`
- `GET|POST|PATCH|DELETE /api/v1/admin/portfolio/projects/:id/highlights[/:childId]`
- `GET|POST|PATCH|DELETE /api/v1/admin/portfolio/projects/:id/collaborators[/:childId]`
- `GET /api/v1/admin/storage/objects?folder=projects&limit=100&offset=0`
- `GET /api/v1/portfolio/projects/:slug`

Las escrituras en proyectos y relaciones se realizan de forma secuencial porque no existe un endpoint transaccional para guardar todo en una sola llamada. Si falla una operación después de guardar el proyecto, **puede existir guardado parcial**. El formulario informa de ello y bloquea el reintento a ciegas: ciérralo y vuelve a abrirlo para ver el estado persistido, evitando duplicar registros.

### Limitaciones intencionales

- El panel todavía no incluye subida directa de imágenes: utiliza el apartado ya existente **Biblioteca multimedia**, donde puedes cargarlas y luego seleccionarlas desde el editor.
- La tecnología clave es el primer elemento de la lista, ya que el backend no tiene una columna `is_primary`.
- La ausencia de demo se deriva de `live_url = null`, sin añadir una columna nueva a la base de datos.
- Si un proyecto tiene más de 100 imágenes en la carpeta `projects`, el selector solo muestra la primera página de 100 (puedes seguir pegando la ruta manualmente).
- La ficha pública de un proyecto se solicita directamente por slug, de modo que sigue funcionando aunque no aparezca en la primera página de proyectos.
- No se incluye cambio de esquema de Supabase ni se crea contenido ficticio en producción.

## Validación

Se comprobó que los dos archivos JSX nuevos no tienen errores sintácticos mediante el analizador TypeScript con modo JSX. La ejecución `npm run lint` / `npm run build` y las pruebas con Supabase real deberán hacerse en el frontend instalado porque esta sesión no tiene dependencias de ese repositorio disponibles localmente.

No se subió a GitHub: la acción de crear una rama devolvió **403 Resource not accessible by integration**.
