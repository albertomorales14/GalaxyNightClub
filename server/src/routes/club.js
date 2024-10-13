const { Router } = require('express');
const router = Router();

const { getClub, getMyClub, updateClub, updateFameClub } = require('../controller/clubController');

router.route('/')
    .get(getClub);

router.route('/:id')
    .get(getMyClub)
    .put(updateClub)
    .put(updateFameClub);

module.exports = router;