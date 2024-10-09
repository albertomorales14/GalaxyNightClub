const {Router} = require('express')
const router = Router()

const { getIngresos, updateIngresos } = require('../controller/ingresosController')

router.route('/')

    .get(getIngresos)

router.route('/:id')

    .put(updateIngresos)

module.exports = router;