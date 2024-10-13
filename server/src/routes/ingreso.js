const { Router } = require('express');
const router = Router();

const { getIngresos, getIngresosByClub, updateIngresos } = require('../controller/ingresosController');

router.route('/')
    .get(getIngresos);

router.route('/Club/:id')
    .get(getIngresosByClub);

router.route('/:id')
    .put(updateIngresos);

module.exports = router;