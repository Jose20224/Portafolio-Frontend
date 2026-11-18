# Restauración visual del portafolio

Comparación con el commit anterior a la integración `9fcacda3a26c3e2e2d423c463ff6edbc489fc84e`.

Se recupera el diseño de Habilidades (imagen y distribución), Contacto (iconos, tarjetas y formulario) y Sobre mí (encabezado y fortalezas con títulos). Se mantienen los datos dinámicos de `PortfolioContext` y el envío de contacto a `/contact/messages`.

## Aplicación

Copia `src/components/About.jsx`, `Skills.jsx` y `Contact.jsx` sobre los mismos archivos del repositorio del frontend. No reemplaces `App.jsx`, contextos, servicios de API ni componentes administrativos.

Luego ejecuta `npm ci`, `npm run lint` y `npm run build` antes de subir los cambios.

**Nota:** La imagen de ciberseguridad recuperada usa la URL externa que tenía el commit anterior. Si el servidor externo deja de ofrecerla, descárgala de una fuente autorizada a `src/assets` y cambia el `src` por una importación local.

**Nota:** Los títulos y descripciones de fortalezas se muestran como en la versión anterior para las dos primeras entradas. Para nuevas fortalezas se muestra el título sin una descripción inventada. La API actual solo suministra cadenas de texto para fortalezas.
