const mejoraController = {};

const mongoose = require("mongoose");
const Mejora = require('../model/Mejora');
const logger = require('../utils/logger'); // winston log

// Obtener TODAS las mejoras
mejoraController.getMejoras = async (request, response) => {
    try {
        const mejoras = await Mejora.find();
        logger.info('\t> getMejoras: Todas las mejoras obtenidas (mejorasController.js)');
        response.json(mejoras);
    } catch (error) {
        logger.error('\t> Error: getMejoras: obtener todas las mejoras (mejorasController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todas las mejoras del club' });
    }
}

// Obtener las mejoras de un CLub
mejoraController.getMejorasByClub = async (request, response) => {
    try {
        const clubId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            logger.error('\t> Error: getMejorasByClub: Invalid club ID (mejorasController.js)');
            return response.status(400).json({ message: 'Invalid club ID' });
        }

        const mejoras = await Mejora.find({ club: clubId });
        if (!mejoras || mejoras.length === 0) {
            logger.error('\t> Error: getMejorasByClub: No se encontraron mejoras para este club (mejorasController.js)');
            return response.status(404).json({ message: 'No se encontraron mejoras para este club' });
        }

        logger.info('\t> getMejorasByClub: Todas las mejoras del club obtenidas (mejorasController.js)');
        response.json(mejoras);
    } catch (error) {
        logger.error('\t> Error: getMejorasByClub: obtener las mejoras del club (mejorasController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener las mejoras del club' });
    }
}

// Actualizar mejora
mejoraController.updateMejora = async (request, response) => {
    try {
        const { comprada } = request.body;
        await Mejora.findByIdAndUpdate(request.params.id, {
            comprada
        });

        logger.info('\t> updateMejora: Mejora actualizada (mejorasController.js)');
        response.json({ message: 'Mejora actualizada' });
    } catch (error) {
        logger.error('\t> Error: updateMejora: Actualizar una mejora (mejorasController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar una mejora' });
    }
}


module.exports = mejoraController;