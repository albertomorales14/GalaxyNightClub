const { Router } = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const createClubResourceController = require('../controller/clubResourceController');
const { ESTADOS_TECNICO, PRODUCTOS } = require('../constants');

const DJ = require('../model/DJ');
const Ingreso = require('../model/Ingreso');
const Mejora = require('../model/Mejora');
const Producto = require('../model/Producto');
const Tecnico = require('../model/Tecnico');

const booleano = (field) => body(field).optional()
    .isBoolean({ strict: true }).withMessage(`${field} debe ser true o false`).toBoolean();

const entero = (field) => body(field).optional()
    .isInt({ min: 0 }).withMessage(`${field} debe ser un número entero positivo`).toInt();

const numero = (field) => body(field).optional()
    .isFloat({ min: 0 }).withMessage(`${field} debe ser un número positivo`).toFloat();

// Crea un router con GET / (recursos del club de la sesión) y PATCH /:id (campos permitidos)
function clubResourceRouter(Model, { notFoundMessage, updateRules }) {
    const controller = createClubResourceController(Model, { notFoundMessage });
    const router = Router();

    router.get('/', controller.list);
    router.patch('/:id', validate(
        param('id').isMongoId().withMessage('Id no válido'),
        ...updateRules
    ), controller.update);

    return router;
}

module.exports = {
    djs: clubResourceRouter(DJ, {
        notFoundMessage: 'DJ no encontrado',
        updateRules: [booleano('residente'), booleano('contratado')]
    }),
    ingresos: clubResourceRouter(Ingreso, {
        notFoundMessage: 'Ingreso no encontrado',
        updateRules: [numero('value')]
    }),
    mejoras: clubResourceRouter(Mejora, {
        notFoundMessage: 'Mejora no encontrada',
        updateRules: [booleano('comprada')]
    }),
    productos: clubResourceRouter(Producto, {
        notFoundMessage: 'Producto no encontrado',
        updateRules: [entero('existencias'), entero('diferencia')]
    }),
    tecnicos: clubResourceRouter(Tecnico, {
        notFoundMessage: 'Técnico no encontrado',
        updateRules: [
            body('estado').optional().isIn(ESTADOS_TECNICO).withMessage('Estado de técnico no válido'),
            body('producto').optional().isIn(['', ...PRODUCTOS]).withMessage('Producto no válido')
        ]
    })
};
