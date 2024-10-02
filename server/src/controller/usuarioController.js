const usuarioController = {}
const { validationResult } = require('express-validator'); // Importar validationResult

const argon2 = require('argon2'); // Argon2: hash password
const jwt = require('jsonwebtoken'); // JWT JSON Web Token
const logger = require('../utils/logger'); // winston log

const Usuario = require('../model/Usuario')

// Middleware para validar los errores de validación
const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

usuarioController.getUsuarios = async (request, response) => {
    const usuarios = await Usuario.find()
    response.json(usuarios)
}

usuarioController.getUsuario = [
    validateFields, // Agregar la validación de campos
    async (request, response) => {
        const usuario = await Usuario.findById(request.params.id)
        if (!usuario) {
            logger.warn('getUsuario (usuarioController.js) Usuario no encontrado')
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }
        logger.info('getUsuario (usuarioController.js) Usuario encontrado: ')
        logger.info(JSON.stringify(usuario))
        response.json(usuario);
    }
];

// Hashear password
const hashPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        logger.error('Error al hashear password: ' + error);
        throw new Error('Error al hashear password: ' + error)
    }
};

// Verificar password
const comparePassword = async (password, hash) => {
    try {
        const isMatch = await argon2.verify(hash, password);
        return isMatch;
    } catch (error) {
        logger.error('Error al verificar password: ' + error)
        throw new Error('Error al verificar password: ' + error)
    }
};

usuarioController.updateUsuario = async (request, response) => {
    try {
        const { id } = request.params;
        const { password, ...rest } = request.body; // Separar password del resto de datos

        if (password) {
            const hashedPassword = await hashPassword(password); // Cifrar la nueva contraseña
            rest.password = hashedPassword;  // Agregar la contraseña cifrada al resto de los datos
          }

        await Usuario.findByIdAndUpdate(id, {
            $set: rest
        })
        response.json({
            message: 'Usuario actualizado'
        })
        /*
        const usuario = await Usuario.findById(request.params.id)
        if (!usuario) {
            logger.warn('getUsuario (usuarioController.js) Usuario no encontrado')
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }
        logger.info('getUsuario (usuarioController.js) Usuario encontrado: ')
        logger.info(JSON.stringify(usuario))
        response.json(usuario);
        */
    } catch (error) {
        logger.error('Error al actualizar usuario: ' + error)
        throw new Error('Error al actualizar usuario: ' + error)
    }
}

usuarioController.login = [
    validateFields, // Agregar la validación de campos
    async (request, response) => {
        try {
            let body = request.body;
            await Usuario.findOne({ username: body.username })
                .then(user => {
                    if (user) {
                        comparePassword(body.password, user.password)
                            .then(isPasswordMatch => {
                                if (isPasswordMatch) {
                                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                                        expiresIn: '1h',
                                    });

                                    // Establecer la cookie
                                    response.cookie('token', token, {
                                        httpOnly: true,
                                        secure: process.env.NODE_ENV === 'production', // Usar true en producción
                                        sameSite: 'Strict',
                                        maxAge: 3600000, // 1 hora
                                    });
                                    logger.info('Acesso login correcto [LOGIN] [usuarioController.js]');
                                    logger.info('Usuario conectado: ' + JSON.stringify(user));
                                    response.json(user)
                                } else {
                                    logger.warn("Contraseña incorrecta [LOGIN] [usuarioController.js]");
                                    response.json("Contraseña incorrecta")
                                }
                            });
                    } else {
                        logger.warn("No existe el usuario [LOGIN] [usuarioController.js]");
                        response.json("No existe este usuario")
                    }
                });
        } catch (error) {
            logger.error("Error de login en usuarioController.js: " + error);
            throw new Error('Error en login: ' + error)
        }
    }
];

/*

// Cerrar sesión
router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Limpiar la cookie del token
    res.json({ message: 'Logged out successfully' });
});

*/

usuarioController.logout = (request, response) => {
    try {

        response.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Expira inmediatamente
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        logger.info("Logout exitoso en usuarioController.js");
        response.json({ message: 'Logout exitoso' });
    } catch (error) {
        logger.error("Error de logout en usuarioController.js: " + error);
        throw new Error('Error en logout: ' + error)
    }
}

/*
// Registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

*/

module.exports = usuarioController;