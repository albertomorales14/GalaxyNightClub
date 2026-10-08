const argon2 = require('argon2');
const { config } = require('../config');
const logger = require('../utils/logger');
const HttpError = require('../utils/httpError');
const { setSessionCookie, clearSessionCookie } = require('../middleware/auth');
const { uploadAvatar, deleteAvatar } = require('../services/cloudinary');
const seed = require('../seed/clubInicial');

const Club = require('../model/Club');
const DJ = require('../model/DJ');
const Ingreso = require('../model/Ingreso');
const Mejora = require('../model/Mejora');
const Producto = require('../model/Producto');
const Tecnico = require('../model/Tecnico');
const Usuario = require('../model/Usuario');

const CLUB_MODELS = [DJ, Ingreso, Mejora, Producto, Tecnico];

// Hash de referencia para que el login tarde lo mismo exista o no el usuario
// (evita descubrir nombres de usuario midiendo el tiempo de respuesta)
const dummyHashPromise = argon2.hash('galaxy-nightclub-dummy-password');

const findCurrentUser = async (request) => {
    const usuario = await Usuario.findById(request.user.id);
    if (!usuario) throw new HttpError(401, 'La cuenta ya no existe');
    return usuario;
};

const authController = {};

// Registro: crea el usuario y su club con todos los datos iniciales
authController.register = async (request, response) => {
    const { username, password } = request.body;

    if (await Usuario.exists({ username })) {
        throw new HttpError(409, `El usuario ${username} ya existe`);
    }

    const club = await Club.create({ propietario: username });
    try {
        await Usuario.create({
            username,
            password: await argon2.hash(password),
            club: club._id
        });
        const withClub = (docs) => docs.map(doc => ({ ...doc, club: club._id }));
        await Promise.all([
            DJ.insertMany(withClub(seed.djs)),
            Mejora.insertMany(withClub(seed.mejoras)),
            Producto.insertMany(withClub(seed.productos)),
            Tecnico.insertMany(withClub(seed.tecnicos)),
            Ingreso.insertMany(withClub(seed.ingresos))
        ]);
    } catch (error) {
        // Si algo falla se deshace todo lo creado para no dejar datos huérfanos
        await Promise.all([
            Usuario.deleteMany({ club: club._id }),
            ...CLUB_MODELS.map(Model => Model.deleteMany({ club: club._id })),
            Club.deleteOne({ _id: club._id })
        ]);
        if (error.code === 11000) throw new HttpError(409, `El usuario ${username} ya existe`);
        throw error;
    }

    logger.info(`Registro: nuevo usuario ${username}`);
    response.status(201).json({ message: 'Cuenta creada con éxito' });
};

// Inicio de sesión
authController.login = async (request, response) => {
    const { username, password } = request.body;
    const usuario = await Usuario.findOne({ username }).select('+password');

    // Siempre se verifica un hash (real o ficticio) y se da el mismo mensaje de error
    const passwordOk = await argon2.verify(usuario?.password || await dummyHashPromise, password);
    if (!usuario || !passwordOk) {
        logger.warn(`Login fallido para el usuario ${username}`);
        throw new HttpError(401, 'Usuario o contraseña incorrectos');
    }

    setSessionCookie(response, usuario);
    logger.info(`Login: ${usuario.username}`);
    response.json(usuario);
};

// Cierre de sesión
authController.logout = (request, response) => {
    clearSessionCookie(response);
    response.json({ message: 'Sesión cerrada' });
};

// Usuario de la sesión actual (permite recuperar la sesión al recargar la página)
authController.me = async (request, response) => {
    response.json(await findCurrentUser(request));
};

// Cambiar contraseña: exige la contraseña actual
authController.changePassword = async (request, response) => {
    const { currentPassword, newPassword } = request.body;
    const usuario = await Usuario.findById(request.user.id).select('+password');
    if (!usuario) throw new HttpError(401, 'La cuenta ya no existe');

    if (!await argon2.verify(usuario.password, currentPassword)) {
        throw new HttpError(400, 'La contraseña actual no es correcta');
    }

    usuario.password = await argon2.hash(newPassword);
    await usuario.save();
    logger.info(`Contraseña cambiada: ${usuario.username}`);
    response.json({ message: 'Contraseña actualizada' });
};

// Cambiar imagen de perfil
authController.updateAvatar = async (request, response) => {
    if (!config.cloudinary.enabled) {
        throw new HttpError(503, 'La subida de imágenes no está configurada en el servidor');
    }
    if (!request.file) throw new HttpError(400, 'No se ha enviado ninguna imagen');

    const usuario = await findCurrentUser(request);
    const imagenAnterior = usuario.imagen;

    usuario.imagen = await uploadAvatar(request.file.buffer, usuario._id);
    await usuario.save();

    // Borrar la imagen anterior no es crítico: si falla solo se registra
    deleteAvatar(imagenAnterior).catch(error => logger.warn(`No se pudo borrar la imagen ${imagenAnterior}: ${error.message}`));

    logger.info(`Imagen de perfil actualizada: ${usuario.username}`);
    response.json(usuario);
};

// Eliminar la cuenta del usuario y todos los datos de su club
authController.deleteAccount = async (request, response) => {
    const usuario = await findCurrentUser(request);
    const clubId = usuario.club;

    await Promise.all(CLUB_MODELS.map(Model => Model.deleteMany({ club: clubId })));
    await Club.deleteOne({ _id: clubId });
    await Usuario.deleteOne({ _id: usuario._id });
    deleteAvatar(usuario.imagen).catch(error => logger.warn(`No se pudo borrar la imagen ${usuario.imagen}: ${error.message}`));

    clearSessionCookie(response);
    logger.warn(`Cuenta eliminada: ${usuario.username}`);
    response.json({ message: 'Cuenta eliminada' });
};

module.exports = authController;
