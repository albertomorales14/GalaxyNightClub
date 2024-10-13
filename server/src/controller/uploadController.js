const uploadController = {};

const logger = require('../utils/logger'); // winston log

// Controlador para manejar la subida de archivos
uploadController.uploadImage = (req, res) => {
    logger.info('\t> uploadImage: Request received (uploadController.js)');
    console.log('console.log: uploadImage (uploadController.js) File:', req.file);  // Ver si el archivo se está procesando
    if (!req.file) {
        logger.error('\t> Error: uploadImage: No file uploaded (uploadController.js)');
        return res.status(400).json({ error: 'Error: uploadImage: No file uploaded (uploadController.js)' });
    }
    logger.info(JSON.stringify(req.file));
    res.json({ message: 'uploadImage: File uploaded successfully (uploadController.js): ', file: req.file });
    logger.info('\t> uploadImage: File uploaded successfully (uploadController.js)');
};

module.exports = uploadController;