const {Router} = require('express')
const router = Router()

const { getTecnicos, updateTecnico } = require('../controller/tecnicoController')

router.route('/')

    .get(getTecnicos)

router.route('/:id')

    .put(updateTecnico)

module.exports = router;