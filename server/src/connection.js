const mongoose = require("mongoose")
const logger = require('./utils/logger'); // winston log

// Cadena de conexion
const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb://localhost/dbtest';


mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
    logger.info('La base de datos MongoDB Atlas ha sido conectada: ' + URI);
})