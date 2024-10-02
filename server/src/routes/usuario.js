const {Router} = require('express')
const { body, param } = require('express-validator'); // Importar los métodos para validar
//const auth = require('../Middleware/auth');
const router = Router()

const { getUsuarios, getUsuario, updateUsuario, login, logout } = require('../controller/usuarioController');

router.route('/')

    .get(getUsuarios);

router.route('/:id')

    .get(
        param('id').isMongoId().withMessage('El ID debe ser un ID de Mongo válido'), // Validar que el ID sea válido
        getUsuario
    )
    .put(updateUsuario);

router.route('/login')

    .post(
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'), // Validar el campo 'username'
        body('password').isLength({ min: 3 }).withMessage('La contraseña debe tener al menos 3 caracteres'), // Validar el campo 'password'
        login
    );

router.route('/logout')

    .post(logout)

module.exports = router;