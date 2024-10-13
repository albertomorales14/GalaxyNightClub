const usuarioController = {};

const argon2 = require('argon2'); // Argon2: hash password
const { validationResult } = require('express-validator'); // Importar validationResult
const jwt = require('jsonwebtoken'); // JWT JSON Web Token
const logger = require('../utils/logger'); // winston log
const Usuario = require('../model/Usuario');

// Middleware para validar los errores de validación
const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Obtener TODOS los usuarios
usuarioController.getUsuarios = async (request, response) => {
    try {
        const usuarios = await Usuario.find();
        logger.info('\t> getUsuarios: Todos los usuarios obtenidos (usuariosController.js)');
        response.json(usuarios);
    } catch (error) {
        logger.error('\t> Error: getUsuarios: obtener todos los usuarios (usuariosController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todos los usuarios' });
    }
}

usuarioController.getUsuario = [
    validateFields, // Agregar la validación de campos
    async (request, response) => {
        try {
            const usuario = await Usuario.findById(request.params.id);
            if (!usuario) {
                logger.warn('\t> getUsuario: Usuario no encontrado (usuarioController.js)');
                return response.status(404).json({ message: 'Usuario no encontrado' });
            }
            logger.info('\t> getUsuario: Usuario encontrado (usuarioController.js)');
            logger.info(JSON.stringify(usuario));
            response.json(usuario);
        } catch (error) {
            logger.error('\t> Error: getUsuario: obtener usuario (usuariosController.js): ' + error);
            response.status(500).json({ message: 'Error al obtener el usuario' });
        }
    }
];

// Hashear password
const hashPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        logger.error('Error al hashear password: ' + error);
        throw new Error('Error al hashear password: ' + error);
    }
};

// Verificar password
const comparePassword = async (password, hash) => {
    try {
        const isMatch = await argon2.verify(hash, password);
        return isMatch;
    } catch (error) {
        logger.error('Error al verificar password: ' + error);
        throw new Error('Error al verificar password: ' + error);
    }
};

const updateUser = async (request, response) => {
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
    } catch (error) {
        logger.error('Error al actualizar usuario: ' + error)
        throw new Error('Error al actualizar usuario: ' + error)
    }
};

// Actualizar contraseña: validar + actualizar usuario
usuarioController.updatePassword = [
    validateFields,
    updateUser
]

// Actualizar imagen de perfil: actualizar usuario
usuarioController.updateImagen = updateUser;

// Validar contraseña
usuarioController.comparePasswordChangePage = async (request, response) => {
    try {
        let body = request.body;
        await Usuario.findOne({ username: body.username })
            .then(user => {
                if (user) {
                    comparePassword(body.password, user.password)
                        .then(isPasswordMatch => {
                            if (isPasswordMatch) {
                                logger.info('\t> comparePasswordChangePage: Password Match! (usuarioController.js)');
                                response.json("SUCCESS");
                            } else {
                                logger.warn("\t> comparePasswordChangePage: Password Doesn´t Match! (usuarioController.js)");
                                response.json("ERROR");
                            }
                        });
                } else {
                    logger.warn("\t> Login: No existe el usuario (usuarioController.js)");
                    response.json("No existe este usuario");
                }
            });
    } catch (error) {
        logger.error("Error de comparePassword en usuarioController.js: " + error);
        throw new Error('Error en comparePassword: ' + error);
    }
}

// Iniciar sesion
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
                                    logger.info('\t> Login: Acesso correcto (usuarioController.js)');
                                    logger.info('\t> Usuario conectado: ' + JSON.stringify(user.username) + ' (usuarioController.js)');
                                    response.json(user);
                                } else {
                                    logger.warn("\t> Login: Contraseña incorrecta (usuarioController.js)");
                                    response.json("Contraseña incorrecta");
                                }
                            });
                    } else {
                        logger.warn('\t> Login: No existe el usuario (usuarioController.js)');
                        response.json('No existe este usuario');
                    }
                });
        } catch (error) {
            logger.error("router post login (usuarioController.js) Error: " + error);
            throw new Error('Error en login: ' + error);
        }
    }
];

// Cerrar sesion
usuarioController.logout = (request, response) => {
    try {
        response.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Expira inmediatamente
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        logger.info("\t> Logout (usuarioController.js)");
        response.json({ message: 'Logout exitoso' });
    } catch (error) {
        logger.error("\t> Error de logout (usuarioController.js): " + error);
        throw new Error('Error de logout (usuarioController.js): ' + error);
    }
}

module.exports = usuarioController;