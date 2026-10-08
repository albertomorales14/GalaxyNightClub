const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { logLimiter } = require('../middleware/rateLimits');
const { createLog } = require('../controller/logController');

const router = Router();

router.post('/', logLimiter, validate(
    body('level').isIn(['info', 'warn', 'error']).withMessage('Nivel de log no válido'),
    body('message').isString().withMessage('El mensaje es obligatorio').isLength({ min: 1, max: 2000 })
), createLog);

module.exports = router;
