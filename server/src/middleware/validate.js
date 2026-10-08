const { validationResult } = require('express-validator');

// Ejecuta las reglas de express-validator y responde 400 con el primer error si alguna falla
const validate = (...rules) => [
    ...rules,
    (request, response, next) => {
        const errors = validationResult(request);
        if (errors.isEmpty()) return next();

        const list = errors.array().map(error => ({ field: error.path, msg: error.msg }));
        response.status(400).json({ message: list[0].msg, errors: list });
    }
];

module.exports = validate;
