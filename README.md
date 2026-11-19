# Filtros de proyectos — Portafolio-Frontend

Esta entrega utiliza las relaciones ya existentes del backend: categoría, tecnologías y colaboradores.
No requiere migración de Supabase ni cambios en Portafolio-Backend.

## Instalación

1. Descarga y descomprime el ZIP.
2. Copia `aplicar_cambios.py` y la carpeta `src` del ZIP a la raíz de `Portafolio-Frontend` (sin sobrescribir manualmente los archivos originales).
3. Desde la raíz del repositorio ejecuta `python aplicar_cambios.py`.
4. Ejecuta `npm install` si todavía no instalaste dependencias, y luego `npm run build`.
5. Revisa el resultado con `git diff` antes de hacer commit y push.

## Cambios

- Galería con categoría, colaboración, tecnología y búsqueda combinados.
- Las tecnologías se extraen de `project_technologies` y los colaboradores de `project_collaborators`.
- Se cargan todas las páginas publicadas de la API (50 por página).
- No se muestran proyectos ficticios si falla el backend.
- El administrador aclara que la categoría es principal y que las tecnologías se usan en filtros públicos.
- El editor existente de colaboradores se conserva: sin colaboradores = individual; con uno o más = en colaboración.

## Importante

No cambia los slugs de las categorías existentes ni reclasifica proyectos automáticamente. Puedes crear nuevas categorías desde el panel de administración y reasignar los proyectos según corresponda. No hace falta crear etiquetas de especialidad, ya que se decidió no utilizar ese filtro.

Si la API falla, se muestra el mensaje de error sin inventar proyectos. El script crea archivos `.bak` para facilitar la reversión.
