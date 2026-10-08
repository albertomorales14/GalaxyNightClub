const logger = require('../utils/logger');

// Registra en el servidor los logs enviados por el cliente
const logController = {};

logController.createLog = (request, response) => {
    const { level, message } = request.body;
    // Se eliminan los saltos de línea para que no se puedan falsificar entradas en el log
    const cleanMessage = message.replace(/[\r\n]+/g, ' ');
    logger[level](`[cliente] ${cleanMessage}`);
    response.status(204).end();
};

module.exports = logController;
