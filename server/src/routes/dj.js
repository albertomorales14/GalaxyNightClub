const { Router } = require('express');
const router = Router();

const { getDJs, getDJsByClub, updateDJ, getAudio } = require('../controller/djController');

router.route('/')
    .get(getDJs) // Obtener todos los DJs

router.route('/Club/:id')
    .get(getDJsByClub);

router.route('/:id')
    .put(updateDJ); // Actualizar un DJ

router.route('/Audio/:id')
    .get(getAudio);

module.exports = router;