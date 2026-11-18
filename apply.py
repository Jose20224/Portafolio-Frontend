from pathlib import Path
import argparse, shutil, sys

parser=argparse.ArgumentParser(description='Restaura animaciones sin perder integracion API')
parser.add_argument('frontend',help='Ruta raiz de Portafolio-Frontend')
args=parser.parse_args()
root=Path(args.frontend).expanduser().resolve()
if not (root/'package.json').is_file() or not (root/'src/admin/AdminProfile.jsx').is_file():
    sys.exit('ERROR: ruta incorrecta; debe ser el repositorio frontend con el panel admin ya integrado.')

admin_path=root/'src/admin/AdminProfile.jsx'
admin=admin_path.read_text(encoding='utf-8')
old="about_paragraphs: form.about_paragraphs.filter((v) => v.trim()), strengths: form.strengths.filter((v) => v.trim()),"
new="about_paragraphs: form.about_paragraphs.map((v) => v.trim()).filter(Boolean), strengths: form.strengths.map((v) => v.trim()).filter(Boolean),"
old2='<textarea rows="3" value={value} onChange={(e) => updateArray(\'about_paragraphs\', index, e.target.value)} />'
new2='<div className="flex-1 min-w-0"><textarea rows="3" maxLength={500} value={value} onChange={(e) => updateArray(\'about_paragraphs\', index, e.target.value)} /><p className="text-xs text-on-surface-variant mt-1">{value.length}/500 caracteres por párrafo</p></div>'
if admin.count(old)!=1 or admin.count(old2)!=1: sys.exit('ERROR: AdminProfile.jsx ha cambiado; no se aplicó ningún archivo. Revisa el parche manualmente.')
admin=admin.replace(old,new).replace(old2,new2)
# Validar antes de realizar cambios
for name in ['Hero.jsx','Projects.jsx']:
    if not (root/'src/components'/name).is_file(): sys.exit(f'ERROR: falta {name}')
for name in ['Hero.jsx','Projects.jsx']:
    target=root/'src/components'/name
    shutil.copy2(target,target.with_suffix('.jsx.bak'))
    shutil.copy2(Path(__file__).parent/'src/components'/name,target)
shutil.copy2(admin_path,admin_path.with_suffix('.jsx.bak'))
admin_path.write_text(admin,encoding='utf-8')

# Restaura animaciones de los bloques Sobre mi sin eliminar lectura de Supabase
about_path=root/'src/components/About.jsx'
about=about_path.read_text(encoding='utf-8')
needle='className="glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/30 space-y-8 shadow-sm"'
if needle in about:
    shutil.copy2(about_path,about_path.with_suffix('.jsx.bak'))
    about=about.replace(needle,'variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/30 space-y-8 shadow-sm"')
    about_path.write_text(about,encoding='utf-8')

# Restaura el fondo decorativo de la seccion Proyectos (en el nuevo componente).
print('OK: Hero, Proyectos, Sobre mi y AdminProfile actualizados. Respaldos .jsx.bak creados.')
