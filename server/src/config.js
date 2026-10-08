// Configuración centralizada: lee y valida las variables de entorno al arrancar
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const splitList = (value) => (value || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

const config = {
    isProduction,
    isTest,
    port: Number(process.env.PORT) || 5050,
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/galaxy_club',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    // Orígenes permitidos para CORS (separados por comas). VERCEL_APP_URL se mantiene por compatibilidad
    corsOrigins: splitList(process.env.CORS_ORIGINS || process.env.VERCEL_APP_URL || 'http://localhost:3000,http://localhost:5173'),
    // Cliente y API en dominios distintos (Vercel + Render) necesitan SameSite=None en producción
    cookieSameSite: (process.env.COOKIE_SAMESITE || (isProduction ? 'none' : 'lax')).toLowerCase(),
    // Número de proxies delante del servidor (Render usa 1), necesario para el rate limit por IP
    trustProxy: Number(process.env.TRUST_PROXY ?? (isProduction ? 1 : 0)),
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    }
};

config.cloudinary.enabled = Boolean(config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret);

function validateConfig() {
    const errors = [];
    if (!config.jwtSecret) {
        errors.push('JWT_SECRET es obligatorio');
    } else if (isProduction && config.jwtSecret.length < 32) {
        errors.push('JWT_SECRET debe tener al menos 32 caracteres en producción');
    }
    if (isProduction && !process.env.MONGODB_URI) {
        errors.push('MONGODB_URI es obligatorio en producción');
    }
    if (!['strict', 'lax', 'none'].includes(config.cookieSameSite)) {
        errors.push('COOKIE_SAMESITE debe ser strict, lax o none');
    }
    if (errors.length > 0) {
        throw new Error('Configuración inválida:\n  - ' + errors.join('\n  - '));
    }
}

module.exports = { config, validateConfig };
