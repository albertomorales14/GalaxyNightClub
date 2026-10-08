// Los clubes creados antes de convertir las imágenes a WebP guardan en la base de datos
// rutas .jpg/.png de técnicos y mejoras. Se traducen a la versión WebP al mostrarlas.
export const imagenLocal = (ruta) =>
    ruta?.startsWith('/img/') ? ruta.replace(/\.(jpe?g|png)$/i, '.webp') : ruta;
