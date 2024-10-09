uploadController = {};

const logger = require('../utils/logger'); // winston log

// Controlador para manejar la subida de archivos
uploadController.uploadImage = (req, res) => {
    logger.info('method: uploadImage (uploadController.js) Request received');
    console.log('console.log method: uploadImage (uploadController.js) File:', req.file);  // Ver si el archivo se está procesando
    if (!req.file) {
        logger.error('method: uploadImage (uploadController.js) No file uploaded');
        return res.status(400).json({ error: 'method: uploadImage (uploadController.js) No file uploaded' });
    }
    logger.info(JSON.stringify(req.file));
    res.json({ message: 'method: uploadImage (uploadController.js) File uploaded successfully', file: req.file });
    logger.info('method: uploadImage (uploadController.js) File uploaded successfully');
};

module.exports = uploadController;