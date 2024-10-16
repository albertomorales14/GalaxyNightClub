const express = require('express');
const uploadRoutes = require('./routes/upload');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // cookies
const logger = require('./utils/logger'); // winston log
const App = express();

// Configuracion
App.set('port', process.env.PORT || 4000);

// Middlewares

const corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true, // cookies
    origin: 'http://localhost:3000'
}

App.use(cors(corsOptions));
App.use(cookieParser());
App.use(express.json({ limit: '50mb' })); // Middleware para que Express maneje JSON
App.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rutas
App.get('/', (request, response) => {
    response.send('Welcome to GALAXY NIGHTCLUB API REST FULL');
    logger.info('Ruta Home (/) - Welcome to GALAXY NIGHTCLUB API REST FULL');
});

// Login
App.post('/login', require('./routes/usuario'));
// Logout
App.post('/logout', require('./routes/usuario'));

// Usuarios
App.use('/api/Usuarios', require('./routes/usuario'));
App.use('/api/Usuarios/:id', require('./routes/usuario'));
App.use('/api/Usuarios/upload/:id', require('./routes/usuario'));
App.post('/comparePassword', require('./routes/usuario'));
App.post('/preparacionDelClub', require('./routes/usuario'));
App.post('/eliminarCuenta', require('./routes/usuario'));

// Club
App.use('/api/Club', require('./routes/club'));
App.use('/api/Club/:id', require('./routes/club'));

// Ingresos
App.use('/api/Ingresos', require('./routes/ingreso'));
App.use('/api/Ingresos/Club/:id', require('./routes/ingreso'));
App.use('/api/Ingresos/:id', require('./routes/ingreso'));

// DJs
App.use('/api/DJs', require('./routes/dj'));
App.use('/api/DJs/Club/:id', require('./routes/dj'));
App.post('/api/DJs/:id', require('./routes/dj'));

// Tecnicos
App.use('/api/Tecnicos', require('./routes/tecnico'));
App.use('/api/Tecnicos/Club/:id', require('./routes/tecnico'));
App.use('/api/Tecnicos/:id', require('./routes/tecnico'));

// Productos
App.use('/api/Productos', require('./routes/producto'));
App.use('/api/Productos/Club/:id', require('./routes/producto'));
App.post('/api/Productos/:id', require('./routes/producto'));

// Mejoras
App.use('/api/Mejoras', require('./routes/mejora'));
App.use('/api/Mejoras/Club/:id', require('./routes/mejora'));
App.post('/api/Mejoras/:id', require('./routes/mejora'));

// Log Service
App.post('/log', (request, response) => {
    const { level, message } = request.body;
    if (logger[level]) {
        logger[level](message); // Registra el log con el nivel proporcionado
        response.status(200).json('[APP] Log registrado');
    } else {
        response.status(400).json('Nivel de log no válido');
    }
});

// Manejo de errores
App.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('Error: Algo va mal...');
});

// Endpoint para subir archivos
App.use('/api', uploadRoutes);
// Carpeta estática para servir imágenes subidas
App.use('/uploads', express.static('src/uploads'));

module.exports = App;