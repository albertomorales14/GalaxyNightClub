const express = require('express')
const uploadRoutes = require('./routes/upload')
const cors = require('cors')
const cookieParser = require('cookie-parser'); // cookies
const logger = require('./utils/logger'); // winston log
const App = express();

// Configuracion
App.set('port', process.env.PORT || 4000)


// Middlewares

const corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true, // cookies
    origin: 'http://localhost:3000'

}
App.use(cors(corsOptions))
App.use(cookieParser());
App.use(express.json()); // Middleware para que Express maneje JSON

/* Set Cookie Settings 
App.use(
    session({
      name: 'session',
      secret: 'secretKeyWooo',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
  );*/

// Rutas
App.get('/', (request, response) => {
    response.send('Welcome to GALAXY NIGHTCLUB API REST FULL');
    logger.info('Ruta Home (/) - Welcome to GALAXY NIGHTCLUB API REST FULL');
});

// Manejo de errores
App.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Archvos
// Endpoint para subir archivos
App.use('/api', uploadRoutes);
// Carpeta estática para servir imágenes subidas
App.use('/uploads', express.static('src/uploads'));

App.use('/api/Mejoras', require('./routes/mejora'));
App.post('/api/Mejoras/:id', require('./routes/mejora'));

App.use('/api/Ingresos', require('./routes/ingreso'));

App.use('/api/Club', require('./routes/club'));
App.use('/api/Club/:id', require('./routes/club'));

App.use('/api/DJs', require('./routes/dj'));
App.post('/api/DJs/:id', require('./routes/dj'));

App.use('/api/Usuarios', require('./routes/usuario'));
App.use('/api/Usuarios/:id', require('./routes/usuario'));

App.use('/api/Tecnicos', require('./routes/tecnico'));
App.use('/api/Tecnicos/:id', require('./routes/tecnico'));

App.use('/api/Productos', require('./routes/producto'));
App.post('/api/Productos/:id', require('./routes/producto'));

// Login
App.post('/login', require('./routes/usuario'));
// Logout
App.post('/logout', require('./routes/usuario'));

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

module.exports = App;