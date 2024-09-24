require('dotenv').config()

const app = require('./App')
const logger = require('./utils/logger'); // winston log
require('./connection')

// esta logica es para ejecutar el servidor
async function main() {
    await app.listen(app.get('port'))
    logger.info('El servidor se está ejecutando en el puerto ' + app.get('port'));
}

main();