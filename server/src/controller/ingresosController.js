const ingresosController = {}

const Ingreso = require('../model/Ingreso')

ingresosController.getIngresos = async(request, response) => {
    const ingreso = await Ingreso.find()
    response.json(ingreso)
}

ingresosController.updateIngresos = async (request, response) => {
    const { dia, value} = request.body;
    await Ingreso.findByIdAndUpdate(request.params.id, {
        dia, value, avg_temp: 0
    })
    response.json({
        message: 'Ingreso actualizado'
    })
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = ingresosController;