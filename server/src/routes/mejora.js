const { Router } = require('express');
const router = Router();

const { getMejoras, getMejorasByClub, updateMejora } = require('../controller/mejoraController');

router.route('/')
    .get(getMejoras);

router.route('/Club/:id')
    .get(getMejorasByClub);

router.route('/:id')
    .put(updateMejora);

module.exports = router;