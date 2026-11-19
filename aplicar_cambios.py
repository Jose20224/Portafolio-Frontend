"""Ejecutar desde la raíz de Portafolio-Frontend: python aplicar_cambios.py"""
from pathlib import Path
import shutil

root = Path.cwd()
context = root / 'src/context/PortfolioContext.jsx'
admin = root / 'src/admin/AdminProjects.jsx'
grid = root / 'src/components/ProjectsGrid.jsx'
source = Path(__file__).resolve().parent / 'src/components/ProjectsGrid.jsx'
for file in (context, admin, grid):
    if not file.exists():
        raise SystemExit(f'No se encontró {file}. Ejecuta desde la raíz de Portafolio-Frontend.')

original = context.read_text(encoding='utf-8')
old_import = "import { projectsData as fallbackProjects } from '../data/projects';\n"
old_init = "categories: [], projects: fallbackProjects, loading: true"
old_request = "apiRequest('/portfolio/projects?page=1&limit=50'),"
old_response = "const projectsResponse = value(4, { items: fallbackProjects.map(normalizeProject) });\n      const apiProjects = (projectsResponse?.items || []).map(normalizeProject);"
old_fallback = "projects: apiProjects.length || anySuccess ? apiProjects : fallbackProjects,"
old_error = "error: failures.length === results.length ? 'No fue posible conectar con la API. Se muestran datos locales de respaldo.' : '',"
for token in (old_import, old_init, old_request, old_response, old_fallback, old_error):
    if token not in original:
        raise SystemExit('El contexto del repositorio cambió. No se aplicó nada; revisa PortfolioContext.jsx.')

# API pública: solicita todas las páginas (máximo 50 por llamada) antes de filtrar.
helper = '''async function fetchAllPublishedProjects() {
  const first = await apiRequest('/portfolio/projects?page=1&limit=50');
  const items = [...(first?.items || [])];
  const pages = Number(first?.pagination?.totalPages || 1);
  for (let page = 2; page <= pages; page += 1) {
    const response = await apiRequest(`/portfolio/projects?page=${page}&limit=50`);
    items.push(...(response?.items || []));
  }
  return { items };
}

'''
updated = original.replace(old_import, '')
updated = updated.replace('export function PortfolioProvider', helper + 'export function PortfolioProvider', 1)
updated = updated.replace(old_init, 'categories: [], projects: [], loading: true')
updated = updated.replace(old_request, 'fetchAllPublishedProjects(),')
updated = updated.replace(old_response, "const projectsResponse = value(4, { items: [] });\n      const apiProjects = (projectsResponse?.items || []).map(normalizeProject);")
updated = updated.replace(old_fallback, 'projects: apiProjects,')
updated = updated.replace(old_error, "error: results[4].status === 'rejected' ? 'No fue posible cargar los proyectos desde la API.' : (failures.length === results.length ? 'No fue posible conectar con la API.' : ''),")

# Administrador: mantener la asociación existente, explicar claramente qué se usa en los filtros.
admin_text = admin.read_text(encoding='utf-8')
old_category = '<Field label="Categoría *"><select required value={form.category_id}'
new_category = '<Field label="Categoría principal *" hint="Se utiliza en el filtro de categorías de la galería pública."><select required value={form.category_id}'
if old_category not in admin_text:
    raise SystemExit('El editor de proyectos cambió. No se aplicó nada; revisa AdminProjects.jsx.')
admin_text = admin_text.replace(old_category, new_category, 1)
# Las secciones de tecnologías y colaboradores ya existen y se conservan.
admin_text = admin_text.replace('Agrega al menos una tecnología: la primera será la tecnología clave.', 'Agrega al menos una tecnología: aparecerá automáticamente en el filtro público de tecnologías.')
admin_text = admin_text.replace('Debes elegir una categoría activa.', 'Debes elegir una categoría principal activa.')

for file in (context, admin, grid):
    shutil.copy2(file, file.with_suffix(file.suffix + '.bak'))
context.write_text(updated, encoding='utf-8')
admin.write_text(admin_text, encoding='utf-8')
shutil.copyfile(source, grid)
print('Cambios aplicados: ProjectsGrid.jsx, PortfolioContext.jsx y AdminProjects.jsx')
print('Copias de seguridad: archivos .bak. Comprueba con npm run build.')
