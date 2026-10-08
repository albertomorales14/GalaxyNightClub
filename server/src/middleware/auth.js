const jwt = require('jsonwebtoken');
const { config } = require('../config');
const HttpError = require('../utils/httpError');

const COOKIE_NAME = 'token';

const cookieOptions = () => ({
    httpOnly: true, // Inaccesible desde JavaScript: protege el token frente a XSS
    secure: config.isProduction || config.cookieSameSite === 'none', // SameSite=None exige HTTPS
    sameSite: config.cookieSameSite,
    path: '/'
});

// Firma el token de sesión y lo guarda en una cookie httpOnly
function setSessionCookie(response, usuario) {
    const token = jwt.sign(
        { sub: usuario._id.toString(), club: usuario.club.toString() },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn, algorithm: 'HS256' }
    );
    const { exp } = jwt.decode(token);
    response.cookie(COOKIE_NAME, token, { ...cookieOptions(), expires: new Date(exp * 1000) });
}

function clearSessionCookie(response) {
    response.clearCookie(COOKIE_NAME, cookieOptions());
}

// Exige una sesión válida y deja en request.user el id del usuario y de su club
const auth = (request, response, next) => {
    const token = request.cookies?.[COOKIE_NAME];
    if (!token) return next(new HttpError(401, 'No has iniciado sesión'));

    try {
        const payload = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
        request.user = { id: payload.sub, club: payload.club };
        next();
    } catch {
        next(new HttpError(401, 'La sesión ha caducado o no es válida'));
    }
};

module.exports = { auth, setSessionCookie, clearSessionCookie };
