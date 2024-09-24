const {Router} = require('express')
const router = Router()

const { getMejoras, updateMejora } = require('../controller/mejoraController')

router.route('/')

    .get(getMejoras)

router.route('/:id')

    .put(updateMejora)

module.exports = router;