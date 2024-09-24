const tecnicoController = {}

const Tecnico = require('../model/Tecnico')

tecnicoController.getTecnicos = async(request, response) => {
    const tecnicos = await Tecnico.find()
    response.json(tecnicos)
}

tecnicoController.updateTecnico = async(request, response) => {
    const {name, estado, club, imagen, producto, salario} = request.body;
    await Tecnico.findByIdAndUpdate(request.params.id, {
        name, estado, club, imagen, producto, salario
    })
    response.json({
        message: 'Tecnico actualizado'
    })
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = tecnicoController;