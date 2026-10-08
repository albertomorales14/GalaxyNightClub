const { matchedData } = require('express-validator');
const HttpError = require('../utils/httpError');

// Crea los controladores de un recurso que pertenece a un club (DJs, técnicos, productos...).
// Todas las consultas se filtran por el club del usuario de la sesión, nunca por un id
// recibido del cliente, así que un usuario no puede leer ni modificar datos de otro club.
function createClubResourceController(Model, { notFoundMessage }) {
    return {
        // Lista en orden de creación: el cliente depende de ese orden
        list: async (request, response) => {
            const docs = await Model.find({ club: request.user.club }).sort({ _id: 1 });
            response.json(docs);
        },

        // Actualiza solo los campos validados en la ruta
        update: async (request, response) => {
            const changes = matchedData(request, { locations: ['body'] });
            if (Object.keys(changes).length === 0) throw new HttpError(400, 'No hay campos que actualizar');
            const doc = await Model.findOneAndUpdate(
                { _id: request.params.id, club: request.user.club },
                { $set: changes },
                { returnDocument: 'after', runValidators: true }
            );
            if (!doc) throw new HttpError(404, notFoundMessage);
            response.json(doc);
        }
    };
}

module.exports = createClubResourceController;
