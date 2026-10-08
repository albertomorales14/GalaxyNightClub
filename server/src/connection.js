const mongoose = require('mongoose');
const { config } = require('./config');
const logger = require('./utils/logger');

// Elimina operadores de MongoDB ($ne, $gt...) que lleguen en los filtros: evita inyección NoSQL
mongoose.set('sanitizeFilter', true);

async function connectDB(uri = config.mongoUri) {
    await mongoose.connect(uri);
    // No se registra la URI: puede contener credenciales
    logger.info(`MongoDB conectado (base de datos: ${mongoose.connection.name})`);
}

async function disconnectDB() {
    await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
