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
        // cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único al archivo
    }
});

// Filtro para limitar qué tipos de archivos pueden ser subidos (opcional)
/*const fileFilter = (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no soportado'), false);
    }
  };*/

const upload = multer({ storage });

module.exports = upload;