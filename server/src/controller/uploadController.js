const uploadController = {};

const path = require('path');
const logger = require('../utils/logger'); // winston log
const cloudinary = require('../middleware/cloudinary');

// Controlador para manejar la subida de archivos
uploadController.uploadImage = async (req, res) => {
    logger.info('\t> uploadImage: Request received (uploadController.js)');
    console.log('console.log: uploadImage (uploadController.js) File:', req.file);  // Ver si el archivo se está procesando
    if (!req.file) {
        logger.error('\t> Error: uploadImage: No file uploaded (uploadController.js)');
        return res.status(400).json({ error: 'Error: uploadImage: No file uploaded (uploadController.js)' });
    }
    logger.info(JSON.stringify(req.file));

    const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: path.parse(req.file.originalname).name // Usa el nombre original sin extensión
    });
    
    res.json({ message: 'uploadImage: File uploaded successfully (uploadController.js): ', file: req.file });
    logger.info('\t> uploadImage: File uploaded successfully (uploadController.js)');
};

// Obtener la imagen de perfil desde cloudinary
uploadController.getImageFromCloudinary = async (request, response) => {
    try {
        let imageId = request.params.id;
        const imageUrl = `https://res.cloudinary.com/djxewugx1/image/upload/${imageId}`;
        logger.info('\t> getImageFromCloudinary: Imagen de cloudinary obtenida (uploadController.js)');
        response.json({ url: imageUrl });
    } catch (error) {
        logger.error('\t> Error: getImageFromCloudinary: Obtener imagen de cloudinary (uploadController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener imagen de cloudinary' });
    }
}

module.exports = uploadController;