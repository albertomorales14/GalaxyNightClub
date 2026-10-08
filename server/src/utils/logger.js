const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const { config } = require('../config');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || (config.isTest ? 'error' : 'info'),
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(), // Log en la consola
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log de errores
        new transports.File({ filename: 'logs/combined.log' }) // Log general
    ]
});

module.exports = logger;
