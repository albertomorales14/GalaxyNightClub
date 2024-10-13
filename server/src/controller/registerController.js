const Club = require('../model/Club');
const DJ = require('../model/DJ');
const Ingreso = require('../model/Ingreso');
const Mejora = require('../model/Mejora');
const Producto = require('../model/Producto');
const Tecnico = require('../model/Tecnico');
const Usuario = require('../model/Usuario');

const registerController = {};

const argon2 = require('argon2'); // Argon2: hash password
const { validationResult } = require('express-validator'); // Importar validationResult
const logger = require('../utils/logger'); // winston log

// Middleware para validar los errores de validación
const validateFields = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    next();
};

// Crear un nuevo usuario y generar el resto de documentos
registerController.generarSetUpClub = [
    validateFields, // Agregar la validación de campos
    async (request, response) => {
        try {
            const { username, password } = request.body;
            // Crear el nuevo Club
            const newClub = new Club({
                fama: 0,
                propietario: username,
                ubicacion: "Del Perro Beach",
                ganancias_almacen: 0,
                ganancias_club: 0,
                ganancias_totales: 0,
                trabajos: 0,
                ventas_almacen: 0,
                celebridades: 0,
                publico: "Vacío",
                visitas: 0,
                ingresos_hoy: 0,
                caja_fuerte: 0,
                productos_vendidos: 0
            });
            await newClub.save();

            // Crear el usuario
            const newUser = new Usuario({
                username: username,
                password: await argon2.hash(password),
                imagen: 'profile-default.png',
                club: newClub._id // Asociar el ID del Club con el Usuario
            });
            await newUser.save();

            // Crear los DJs:

            /* Solomun */
            const solomun = new DJ({
                name: "Solomun",
                residente: true,
                contratado: true,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await solomun.save();

            /* Tale Of Us */
            const taleOfUs = new DJ({
                name: "Tale Of Us",
                residente: false,
                contratado: false,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await taleOfUs.save();

            /* Dixon */
            const dixon = new DJ({
                name: "Dixon",
                residente: false,
                contratado: false,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await dixon.save();

            /* The Black Madonna */
            const madonna = new DJ({
                name: "The Black Madonna",
                residente: false,
                contratado: false,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await madonna.save();

            // Crear Mejoras

            /* Equipo */
            const mejoraEquipo = new Mejora({
                name: "Equipo",
                comprada: false,
                precio: 1425000,
                imagen: "/img/mejoras/mejora1-equipo.jpg",
                descripcion: "Compra esta mejora para instalar equipo de mayor calidad. Esto aumentará la productividad de los técnicos del almacén y les permitirá acumular productos más rápidamente.",
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await mejoraEquipo.save();

            /* Personal */
            const mejoraPersonal = new Mejora({
                name: "Personal",
                comprada: false,
                precio: 475000,
                imagen: "/img/mejoras/mejora2-personal.jpg",
                descripcion: "Compra esta mejora para contratar más bármanes y gorilas. Esto reducirá la pérdida de fama diaria del club nocturno.",
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await mejoraPersonal.save();

            /* Equipo */
            const mejoraSeguridad = new Mejora({
                name: "Seguridad",
                comprada: false,
                precio: 695000,
                imagen: "/img/mejoras/mejora3-security.jpg",
                descripcion: "Compra esta mejora para colocar guardias de seguridad y equipo de vigilancia. Esto reducirá las posibilidades de que los enemigos ataquen el club nocturno.",
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await mejoraSeguridad.save();

            // Productos

            /* Mercancia y cargamentos */
            const producto1 = new Producto({
                name: "Mercancía y cargamentos",
                capacidadMax: 50,
                existencias: 50,
                totalValue: 500000,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto1.save();

            /* Equipo de caza */
            const producto2 = new Producto({
                name: "Equipo de caza",
                capacidadMax: 100,
                existencias: 100,
                totalValue: 500000,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto2.save();

            /* Importaciones sudamericanas */
            const producto3 = new Producto({
                name: "Importaciones sudamericanas",
                capacidadMax: 10,
                existencias: 10,
                totalValue: 270000,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto3.save();

            /* Investigaciones farmacéuticas */
            const producto4 = new Producto({
                name: "Investigaciones farmacéuticas",
                capacidadMax: 20,
                existencias: 20,
                totalValue: 229500,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto4.save();

            /* Productos orgánicos */
            const producto5 = new Producto({
                name: "Productos orgánicos",
                capacidadMax: 80,
                existencias: 80,
                totalValue: 300000,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto5.save();

            /* Fotocopias e impresiones */
            const producto6 = new Producto({
                name: "Fotocopias e impresiones",
                capacidadMax: 60,
                existencias: 60,
                totalValue: 250000,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto6.save();

            /* Imprenta de billetes */
            const producto7 = new Producto({
                name: "Imprenta de billetes",
                capacidadMax: 40,
                existencias: 40,
                totalValue: 189000,
                diferencia: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await producto7.save();

            // Tecnicos

            /* Tecnico 1 */
            const tecnico1 = new Tecnico({
                name: "tecnico1",
                estado: "CONTRATADO",
                imagen: "/img/tecnicos/tecnico1.png",
                producto: "",
                salario: 0,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await tecnico1.save();

            /* Tecnico 2 */
            const tecnico2 = new Tecnico({
                name: "tecnico2",
                estado: "NO CONTRATADO",
                imagen: "/img/tecnicos/tecnico2.png",
                producto: "",
                salario: 141000,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await tecnico2.save();

            /* Tecnico 3 */
            const tecnico3 = new Tecnico({
                name: "tecnico3",
                estado: "BLOQUEADO",
                imagen: "/img/tecnicos/tecnico3.png",
                producto: "",
                salario: 184000,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await tecnico3.save();

            /* Tecnico 4 */
            const tecnico4 = new Tecnico({
                name: "tecnico4",
                estado: "BLOQUEADO",
                imagen: "/img/tecnicos/tecnico4.png",
                producto: "",
                salario: 240000,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await tecnico4.save();

            /* Tecnico 5 */
            const tecnico5 = new Tecnico({
                name: "tecnico5",
                estado: "BLOQUEADO",
                imagen: "/img/tecnicos/tecnico5.png",
                producto: "",
                salario: 312000,
                club: newClub._id // Asociar el ID del Club con el DJ
            });
            await tecnico5.save();

            // Ingresos

            /* L */
            const ingreso1 = new Ingreso({ dia: "L", value: 0, club: newClub._id });
            await ingreso1.save();

            /* M */
            const ingreso2 = new Ingreso({ dia: "M", value: 0, club: newClub._id });
            await ingreso2.save();

            /* X */
            const ingreso3 = new Ingreso({ dia: "X", value: 0, club: newClub._id });
            await ingreso3.save();

            /* J */
            const ingreso4 = new Ingreso({ dia: "J", value: 0, club: newClub._id });
            await ingreso4.save();

            /* V */
            const ingreso5 = new Ingreso({ dia: "V", value: 0, club: newClub._id });
            await ingreso5.save();

            /* S */
            const ingreso6 = new Ingreso({ dia: "S", value: 0, club: newClub._id });
            await ingreso6.save();

            /* D */
            const ingreso7 = new Ingreso({ dia: "D", value: 0, club: newClub._id });
            await ingreso7.save();

            response.json('SUCCESS');

        } catch (error) {
            logger.error('Error: generarSetUpClub: generar todas las colecciones (registerController.js): ' + error);
            response.status(500).json({ message: 'Error al generar todas las colecciones' });
        }
    }
]

module.exports = registerController;