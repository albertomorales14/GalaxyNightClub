const multer = require('multer');
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const HttpError = require('../utils/httpError');

// Ruta no encontrada
const notFound = (request, response, next) => {
    next(new HttpError(404, `No existe la ruta ${request.method} ${request.path}`));
};

// Convierte cualquier error en una respuesta JSON coherente sin filtrar detalles internos
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
    let status = 500;
    let message = 'Error interno del servidor';

    if (error instanceof HttpError) {
        status = error.status;
        message = error.message;
    } else if (error instanceof multer.MulterError) {
        status = 400;
        message = error.code === 'LIMIT_FILE_SIZE' ? 'La imagen supera el tamaño máximo de 5MB' : error.message;
    } else if (error instanceof mongoose.Error.ValidationError) {
        status = 400;
        message = Object.values(error.errors)[0]?.message || 'Datos no válidos';
    } else if (error instanceof mongoose.Error.CastError) {
        status = 400;
        message = `Valor no válido para ${error.path}`;
    } else if (error.type === 'entity.parse.failed') {
        status = 400;
        message = 'El cuerpo de la petición no es un JSON válido';
    } else if (error.type === 'entity.too.large') {
        status = 413;
        message = 'La petición es demasiado grande';
    }

    if (status >= 500) {
        logger.error(`${request.method} ${request.originalUrl}: ${error.stack || error}`);
    }

    response.status(status).json({ message, ...(error.details && { errors: error.details }) });
};

module.exports = { notFound, errorHandler };
