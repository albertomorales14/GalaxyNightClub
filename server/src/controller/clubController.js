const clubController = {};

const mongoose = require("mongoose");
const Club = require('../model/Club');
const logger = require('../utils/logger'); // winston log

// Obtener TODOS los Clubes
clubController.getClub = async (request, response) => {
    try {
        const club = await Club.find()
        logger.info('\t> getClub: Todos los Clubes obtenidos (clubController.js)');
        response.json(club)
    } catch (error) {
        logger.error('\t> Error: getClub: obtener todos los Clubs (clubController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todos los Clubes' });
    }
}

// Obtener Club del usuario
clubController.getMyClub = async (request, response) => {
    try {
        const userId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            logger.error('\t> Error: getMyClub: Invalid club ID (clubController.js)');
            return response.status(400).json({ message: 'Invalid user ID' });
        }
    
        const club = await Club.findById(userId);
        if (!club || club.length === 0) {
            logger.error('\t> Error: getMyClub: No se encontraron Clubes para este usuario (clubController.js)');
            return response.status(404).json({ message: 'No se encontraron Clubes para este usuario' });
        }
    
        logger.info('\t> getMyClub: Club obtenido (clubController.js)');
        response.json(club);
    } catch (error) {
        logger.error('\t> Error: getMyClub: Obtener club de un usuario (clubController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener club del usuario' });
    }
}

// Actualizar club
clubController.updateClub = async (request, response) => {
    try {
        const {
            fama,
            propietario,
            ubicacion,
            ganancias_almacen,
            ganancias_club,
            ganancias_totales,
            trabajos,
            ventas_almacen,
            celebridades,
            publico,
            visitas,
            ingresos_hoy,
            caja_fuerte,
            productos_vendidos
        } = request.body;

        await Club.findByIdAndUpdate(request.params.id, {
            fama,
            propietario,
            ubicacion,
            ganancias_almacen,
            ganancias_club,
            ganancias_totales,
            trabajos,
            ventas_almacen,
            celebridades,
            publico,
            visitas,
            ingresos_hoy,
            caja_fuerte,
            productos_vendidos
        });

        logger.info('\t> updateClub: Club actualizado (clubController.js)');
        response.json({ message: 'Club actualizado' });
    } catch (error) {
        logger.error('\t> Error: updateClub: Actualizar Club (clubController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar club' });
    }
}

// Actualizar la fama del club
clubController.updateFameClub = async (request, response) => {
    try {
        const { fama, trabajos } = request.body;
        await Club.findByIdAndUpdate(request.params.id, { fama, trabajos });
        logger.info('\t> updateFameClub: Fama del club actualizada (clubController.js)');
        response.json({ message: 'Fama del club actualizada' });
    } catch (error) {
        logger.error('\t> Error: updateFameClub: Actualizar fama del club (clubController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar fama del club' });
    }
}

module.exports = clubController;