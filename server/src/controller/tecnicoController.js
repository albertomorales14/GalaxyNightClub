const tecnicoController = {};

const mongoose = require("mongoose");
const Tecnico = require('../model/Tecnico');
const logger = require('../utils/logger'); // winston log

// Obtener TODOS los tecnicos
tecnicoController.getTecnicos = async(request, response) => {
    try {
        const tecnicos = await Tecnico.find();
        logger.info('\t> getTecnicos: Todos los tecnicos obtenidos (tecnicoController.js)');
        response.json(tecnicos);
    } catch (error) {
        logger.error('\t> Error: getTecnicos: obtener todos los tecnicos (tecnicoController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todos los tecnicos del club' });
    }
}

// Obtener los tecnicos de un CLub
tecnicoController.getTecnicosByClub = async (request, response) => {
    try {
        const clubId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            logger.error('\t> Error: getTecnicosByClub: Invalid club ID (tecnicoController.js)');
            return response.status(400).json({ message: 'Invalid club ID' });
        }

        const tecnicos = await Tecnico.find({ club: clubId });
        if (!tecnicos || tecnicos.length === 0) {
            logger.error('\t> Error: getTecnicosByClub: No se encontraron tecnicos para este club (tecnicoController.js)');
            return response.status(404).json({ message: 'No se encontraron tecnicos para este club' });
        }

        logger.info('\t> getTecnicosByClub: Todos los tecnicos del club obtenidos (tecnicoController.js)');
        response.json(tecnicos);
    } catch (error) {
        logger.error('\t> Error: getTecnicosByClub: obtener los tecnicos del club (tecnicoController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener los tecnicos del club' });
    }
}

// Actualizar tecnico
tecnicoController.updateTecnico = async(request, response) => {
    try {
        const { estado, producto } = request.body;
        await Tecnico.findByIdAndUpdate(request.params.id, {
            estado, producto
        })
        logger.info('\t> updateTecnico: Tecnico actualizado (tecnicoController.js)');
        response.json({ message: 'Tecnico actualizado' });
    } catch (error) {
        logger.error('\t> Error: updateTecnico: Actualizar un tecnico (tecnicoController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar un tecnico' });
    }
}

module.exports = tecnicoController;