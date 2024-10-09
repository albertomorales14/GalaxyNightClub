const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear el directorio uploads/img si no existe
const uploadDir = '../uploads/img';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/img'); // Guardar en uploads/img
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantener el nombre original del archivo
        // Asigna un nombre único al archivo
        // cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Establecer limite de 5 MB para archivos
const limits = { fileSize: 5 * 1024 * 1024 }

// Filtro para limitar qué tipos de archivos pueden ser subidos (opcional)
const fileFilter = (req, file, cb) => {
    // Aceptar solo imágenes con extensiones válidas
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (mimeType && extname) {
        return cb(null, true);
    } else {
        // Rechaza el archivo si no es del tipo adecuado
        return cb(new Error('function fileFilter (multerConfig.js) Error: Only images are allowed'), false);
    }
};

const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter });

module.exports = upload;