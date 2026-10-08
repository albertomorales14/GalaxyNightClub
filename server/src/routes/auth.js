const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const { auth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimits');
const authController = require('../controller/authController');

const router = Router();

const newUsername = body('username')
    .isString().withMessage('El nombre de usuario es obligatorio')
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres')
    .matches(/^[\p{L}\p{N}_.-]+$/u).withMessage('El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos');

const newPassword = (field) => body(field)
    .isString().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 128 }).withMessage('La contraseña debe tener entre 8 y 128 caracteres');

router.post('/register', authLimiter, validate(
    newUsername,
    newPassword('password')
), authController.register);

router.post('/login', authLimiter, validate(
    body('username').isString().trim().notEmpty().withMessage('El nombre de usuario es obligatorio').isLength({ max: 100 }),
    body('password').isString().notEmpty().withMessage('La contraseña es obligatoria').isLength({ max: 128 })
), authController.login);

router.post('/logout', authController.logout);

router.get('/me', auth, authController.me);

router.put('/password', auth, authLimiter, validate(
    body('currentPassword').isString().notEmpty().withMessage('La contraseña actual es obligatoria'),
    newPassword('newPassword')
), authController.changePassword);

router.put('/avatar', auth, upload.single('image'), authController.updateAvatar);

router.delete('/account', auth, authController.deleteAccount);

module.exports = router;
