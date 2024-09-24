const {Router} = require('express')
const router = Router()

const { getIngresos } = require('../controller/ingresosController')

router.route('/')

    .get(getIngresos)

module.exports = router;