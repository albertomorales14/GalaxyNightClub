const cloudinary = require('cloudinary').v2;
const { config } = require('../config');

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
});

const AVATAR_FOLDER = 'galaxy-nightclub/avatars';

// Sube un buffer de imagen a Cloudinary y devuelve el resultado
function uploadImage(buffer, options) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ resource_type: 'image', ...options }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
            .end(buffer);
    });
}

// Sube la imagen de perfil de un usuario con un nombre único generado en el servidor
async function uploadAvatar(buffer, userId) {
    const result = await uploadImage(buffer, {
        folder: AVATAR_FOLDER,
        public_id: `${userId}-${Date.now()}`,
        transformation: [{ width: 512, height: 512, crop: 'limit' }]
    });
    return `${result.public_id}.${result.format}`;
}

// Elimina una imagen de perfil subida por la aplicación (nunca la imagen por defecto ni las antiguas)
async function deleteAvatar(imagen) {
    if (!imagen?.startsWith(`${AVATAR_FOLDER}/`)) return;
    const publicId = imagen.replace(/\.[^.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
}

module.exports = { uploadAvatar, deleteAvatar };
