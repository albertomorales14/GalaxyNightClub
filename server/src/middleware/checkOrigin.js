const { config } = require('../config');
const HttpError = require('../utils/httpError');

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

// Protección CSRF: con cookies SameSite=None, otra web podría enviar formularios a la API
// usando la sesión del usuario. Los navegadores siempre envían la cabecera Origin en esas
// peticiones, así que se rechazan las que vengan de un origen no permitido.
const checkOrigin = (request, response, next) => {
    if (SAFE_METHODS.has(request.method)) return next();

    const origin = request.get('origin');
    if (!origin || config.corsOrigins.includes(origin)) return next();

    next(new HttpError(403, 'Origen no permitido'));
};

module.exports = checkOrigin;
