const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('./config');
const { auth } = require('./middleware/auth');
const checkOrigin = require('./middleware/checkOrigin');
const { apiLimiter } = require('./middleware/rateLimits');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const clubResources = require('./routes/clubResources');

const App = express();

App.set('trust proxy', config.trustProxy);
App.disable('x-powered-by');

// Middlewares
App.use(helmet());
App.use(cors({
    origin: config.corsOrigins,
    credentials: true // Permite enviar la cookie de sesión
}));
App.use(cookieParser());
App.use(express.json({ limit: '100kb' }));
App.use('/api', apiLimiter, checkOrigin);

// Rutas públicas
App.get('/', (request, response) => {
    response.json({ message: 'Galaxy NightClub API REST' });
});
App.get('/api/health', (request, response) => {
    response.json({ status: 'ok' });
});
App.use('/api/auth', require('./routes/auth'));
App.use('/api/logs', require('./routes/logs'));

// Rutas protegidas: requieren sesión y solo acceden a los datos del club del usuario
App.use('/api/club', auth, require('./routes/club'));
App.use('/api/djs', auth, clubResources.djs);
App.use('/api/ingresos', auth, clubResources.ingresos);
App.use('/api/mejoras', auth, clubResources.mejoras);
App.use('/api/productos', auth, clubResources.productos);
App.use('/api/tecnicos', auth, clubResources.tecnicos);

// Manejo de errores (siempre al final)
App.use(notFound);
App.use(errorHandler);

module.exports = App;
