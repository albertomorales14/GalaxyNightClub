const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { PUBLICO } = require('../constants');
const { getMyClub, updateMyClub } = require('../controller/clubController');

const router = Router();

const cantidad = (field) => body(field).optional()
    .isFloat({ min: 0 }).withMessage(`${field} debe ser un número positivo`).toFloat();

router.route('/')
    .get(getMyClub)
    .patch(validate(
        body('fama').optional().isInt({ min: 0, max: 100 }).withMessage('La fama debe estar entre 0 y 100').toInt(),
        body('publico').optional().isIn(PUBLICO).withMessage('Valor de público no válido'),
        ...[
            'ganancias_almacen', 'ganancias_club', 'ganancias_totales', 'trabajos', 'ventas_almacen',
            'celebridades', 'visitas', 'ingresos_hoy', 'caja_fuerte', 'productos_vendidos', 'productos_acumulados'
        ].map(cantidad)
    ), updateMyClub);

module.exports = router;
