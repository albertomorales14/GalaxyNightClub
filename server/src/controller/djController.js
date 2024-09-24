const djController = {}

const DJ = require('../model/DJ')

djController.getDJs = async(request, response) => {
    const dj = await DJ.find()
    response.json(dj)
}

djController.updateDJ = async(request, response) => {
    const {name, residente, contratado} = request.body;
    await DJ.findByIdAndUpdate(request.params.id, {
        name, 
        residente, 
        contratado
    })
    response.json({
        message: 'DJ actualizado'
    })
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = djController;