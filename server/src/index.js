const { config, validateConfig } = require('./config');
const logger = require('./utils/logger');

async function main() {
    validateConfig();

    const { connectDB, disconnectDB } = require('./connection');
    const App = require('./App');

    await connectDB();
    const server = App.listen(config.port, () => {
        logger.info(`El servidor se está ejecutando en el puerto ${config.port}`);
    });

    // Cierre ordenado (Render envía SIGTERM al redesplegar)
    const shutdown = (signal) => {
        logger.info(`${signal} recibido, cerrando el servidor...`);
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

main().catch(error => {
    logger.error(`No se pudo arrancar el servidor: ${error.message}`);
    process.exit(1);
});
