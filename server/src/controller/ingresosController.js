const ingresosController = {};

const mongoose = require("mongoose");
const Ingreso = require('../model/Ingreso');
const logger = require('../utils/logger'); // winston log

// Obtener TODOS los ingresos
ingresosController.getIngresos = async(request, response) => {
    try {
        const ingreso = await Ingreso.find();
        logger.info('\t> getIngresos: Todos los ingresos obtenidos (ingresosController.js)');
        response.json(ingreso);
    } catch (error) {
        logger.error('\t> Error: getIngresos: obtener todos los ingresos (ingresosController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todos los ingresos del club' });
    }
}

// Obtener los ingresos de un CLub
ingresosController.getIngresosByClub = async (request, response) => {
    try {
        const clubId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            logger.error('\t> Error: getIngresosByClub: Invalid club ID (ingresosController.js)');
            return response.status(400).json({ message: 'Invalid club ID' });
        }

        const ingresos = await Ingreso.find({ club: clubId });
        if (!ingresos || ingresos.length === 0) {
            logger.error('\t> Error: getIngresosByClub: No se encontraron ingresos para este club (ingresosController.js)');
            return response.status(404).json({ message: 'No se encontraron ingresos para este club' });
        }

        logger.info('\t> getIngresosByClub: Todos los ingresos del club obtenidos (ingresosController.js)');
        response.json(ingresos);
    } catch (error) {
        logger.error('\t> Error: getIngresosByClub: obtener los ingresos del club (ingresosController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener los ingresos del club' });
    }
}

// Actualizar ingreso
ingresosController.updateIngresos = async (request, response) => {
    try {
        const { value } = request.body;
        await Ingreso.findByIdAndUpdate(request.params.id, {
            value
        });

        logger.info('\t> updateIngresos: Ingreso actualizado (ingresosController.js)');
        response.json({ message: 'Ingreso actualizado' });
    } catch (error) {
        logger.error('\t> Error: updateIngresos: Actualizar un ingreso (ingresosController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar un ingreso' });
    }
}

module.exports = ingresosController;