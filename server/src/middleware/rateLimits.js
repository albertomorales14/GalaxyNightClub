const { rateLimit } = require('express-rate-limit');
const { config } = require('../config');

const limiter = (options) => rateLimit({
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skip: () => config.isTest,
    message: { message: 'Demasiadas peticiones, inténtalo de nuevo más tarde' },
    ...options
});

// Límite general para toda la API
const apiLimiter = limiter({ windowMs: 60 * 1000, limit: 300 });

// Login y registro: frena ataques de fuerza bruta
const authLimiter = limiter({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    skipSuccessfulRequests: true,
    message: { message: 'Demasiados intentos, espera unos minutos antes de volver a intentarlo' }
});

// Logs enviados por el cliente
const logLimiter = limiter({ windowMs: 60 * 1000, limit: 60 });

module.exports = { apiLimiter, authLimiter, logLimiter };
