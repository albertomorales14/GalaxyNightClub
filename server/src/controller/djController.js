const djController = {};

const mongoose = require("mongoose");
const DJ = require('../model/DJ');
const logger = require('../utils/logger'); // winston log

// Obtener TODOS los DJ
djController.getDJs = async (request, response) => {
    try {
        const djs = await DJ.find();
        logger.info('\t> getDJs: Todos los DJs obtenidos (djController.js)');
        response.json(djs);
    } catch (error) {
        logger.error('\t> Error: getDJs: obtener todos los DJs (djController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todos los DJs del club' });
    }
}

// Obtener los DJ de un CLub
djController.getDJsByClub = async (request, response) => {
    try {
        const clubId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            logger.error('\t> Error: getDJsByClub: Invalid club ID (djController.js)');
            return response.status(400).json({ message: 'Invalid club ID' });
        }

        const djs = await DJ.find({ club: clubId });
        if (!djs || djs.length === 0) {
            logger.error('\t> Error: getDJsByClub: No se encontraron DJs para este club (djController.js)');
            return response.status(404).json({ message: 'No se encontraron DJs para este club' });
        }

        logger.info('\t> getDJsByClub: Todos los DJs del club obtenidos (djController.js)');
        response.json(djs);
    } catch (error) {
        logger.error('\t> Error: getDJsByClub: obtener los DJs del club (djController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener los DJs del club' });
    }
}

// Actualizar DJ
djController.updateDJ = async (request, response) => {
    try {
        const { residente, contratado } = request.body;
        await DJ.findByIdAndUpdate(request.params.id, {
            residente,
            contratado
        });

        logger.info('\t> updateDJ: DJ actualizado (djController.js)');
        response.json({ message: 'DJ actualizado' });
    } catch (error) {
        logger.error('\t> Error: updateDJ: Actualizar un DJ (djController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar un DJ' });
    }
}

// Obtener audio desde Cloudinary
djController.getAudio = async (request, response) => {
    try {
        let audioId = request.params.id;
        audioId = audioId.replace(' ', '/');
        const audioUrl = `https://res.cloudinary.com/djxewugx1/video/upload/${audioId}.mp3`;
        logger.info('\t> getAudio: Audio de DJ obtenido (djController.js)');
        response.json({ url: audioUrl });
    } catch (error) {
        logger.error('\t> Error: getAudio: Obtener audio de DJ (djController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener audio de un DJ' });
    }
}

module.exports = djController;