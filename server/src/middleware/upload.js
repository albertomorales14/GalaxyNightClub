const multer = require('multer');
const HttpError = require('../utils/httpError');

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// La imagen se guarda en memoria y se sube directamente a Cloudinary:
// no se escribe nada en el disco del servidor (en Render es efímero)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024, files: 1 }, // 5MB
    fileFilter: (request, file, cb) => {
        if (ALLOWED_MIME_TYPES.has(file.mimetype)) return cb(null, true);
        cb(new HttpError(400, 'Solo se permiten imágenes JPG, PNG, WEBP o GIF'));
    }
});

module.exports = upload;
