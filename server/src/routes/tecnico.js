const { Router } = require('express');
const router = Router();

const { getTecnicos, getTecnicosByClub, updateTecnico } = require('../controller/tecnicoController');

router.route('/')
    .get(getTecnicos);

router.route('/Club/:id')
    .get(getTecnicosByClub);

router.route('/:id')
    .put(updateTecnico);

module.exports = router;