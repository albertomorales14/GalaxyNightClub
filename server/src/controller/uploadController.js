uploadController = {};

const upload = require('../Middleware/multerConfig');
const logger = require('../utils/logger'); // winston log

// Controlador para manejar la subida de archivos
uploadController.uploadImage = (req, res) => {
    console.log('Request received');
    logger.info('Request received: method: uploadImage (uploadController.js)')
    console.log('File:', req.file);  // Ver si el archivo se está procesando
    logger.info('File: ' + req.file + ' method: uploadImage (uploadController.js)')
    if (!req.file) {
        logger.error('uploadImage (uploadController.js) No file uploaded')
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', file: req.file });
    logger.info('uploadImage (uploadController.js) File uploaded successfully')
};

module.exports = uploadController;