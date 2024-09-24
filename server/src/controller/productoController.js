const productoController = {}

const Producto = require('../model/Producto')

productoController.getProductos = async(request, response) => {
    const productos = await Producto.find()
    response.json(productos)
}

productoController.updateProducto = async(request, response) => {
    const {name, capacidadMax, existencias, totalValue, diferencia} = request.body;
    await Producto.findByIdAndUpdate(request.params.id, {
        name, 
        capacidadMax, 
        existencias, 
        totalValue,
        diferencia
    })
    response.json({
        message: 'Producto actualizado'
    })
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = productoController;