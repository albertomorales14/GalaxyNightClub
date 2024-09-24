const {Router} = require('express')
const router = Router()

const { getProductos, updateProducto } = require('../controller/productoController')

router.route('/')

    .get(getProductos)

router.route('/:id')

    .put(updateProducto)

module.exports = router;