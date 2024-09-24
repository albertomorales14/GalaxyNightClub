const ingresosController = {}

const Ingreso = require('../model/Ingreso')

ingresosController.getIngresos = async(request, response) => {
    const ingreso = await Ingreso.find()
    response.json(ingreso)
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = ingresosController;