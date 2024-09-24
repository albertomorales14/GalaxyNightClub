const mejoraController = {}

const Mejora = require('../model/Mejora')

mejoraController.getMejoras = async(request, response) => {
    const mejoras = await Mejora.find()
    response.json(mejoras)
}

mejoraController.updateMejora = async(request, response) => {
    //const mejora = await Mejora.findById({_id: request.params.id}, req.body, { new: true })
    //response.json(mejora)

    const {name, comprada, precio, imagen, descripcion} = request.body;
    await Mejora.findByIdAndUpdate(request.params.id, {
        name, 
        comprada, 
        precio, 
        imagen, 
        descripcion
    })
    response.json({
        message: 'Mejora actualizada'
    })

    //test
    /*await Mejora.findById(request.params._id, (err, mejora) => {
        if (mejora) {
            mejora.name = request.body.name;
            mejora.comprada = request.body.comprada;
            mejora.precio = request.body.precio;
            mejora.imagen = request.body.imagen;
            mejora.descripcion = request.body.descripcion;

            mejora.save().then(mej => {
                response.json('Mejora Updated Successfully');
            })
            .catch(err => {
                response.status(400).send("Unable To Update Employee");
            })
        }
    })*/
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = mejoraController;