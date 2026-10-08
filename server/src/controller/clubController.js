const { matchedData } = require('express-validator');
const Club = require('../model/Club');
const HttpError = require('../utils/httpError');

const clubController = {};

// Club del usuario de la sesión
clubController.getMyClub = async (request, response) => {
    const club = await Club.findById(request.user.club);
    if (!club) throw new HttpError(404, 'No se ha encontrado el club');
    response.json(club);
};

// Actualiza solo los campos validados en la ruta
clubController.updateMyClub = async (request, response) => {
    const changes = matchedData(request, { locations: ['body'] });
    if (Object.keys(changes).length === 0) throw new HttpError(400, 'No hay campos que actualizar');
    const club = await Club.findByIdAndUpdate(
        request.user.club,
        { $set: changes },
        { returnDocument: 'after', runValidators: true }
    );
    if (!club) throw new HttpError(404, 'No se ha encontrado el club');
    response.json(club);
};

module.exports = clubController;
