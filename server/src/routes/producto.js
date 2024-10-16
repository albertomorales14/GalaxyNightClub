const { Router } = require('express');
const router = Router();

const { getProductos, getProductosByClub, getProductosClubByName, updateProducto } = require('../controller/productoController');

router.route('/')
    .get(getProductos);

router.route('/Club/:id')
    .get(getProductosByClub);

router.route('/:id')
    .put(updateProducto);

module.exports = router;