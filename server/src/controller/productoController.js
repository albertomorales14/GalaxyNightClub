const productoController = {};

const mongoose = require("mongoose");
const Producto = require('../model/Producto');
const logger = require('../utils/logger'); // winston log

// Obtener TODOS los productos
productoController.getProductos = async (request, response) => {
    try {
        const productos = await Producto.find()
        logger.info('\t> getProductos: Todos los productos obtenidos (productoController.js)');
        response.json(productos);
    } catch (error) {
        logger.error('\t> Error: getProductos: obtener todos los productos (productoController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener todos los productos del club' });
    }
}

// Obtener los productos de un CLub
productoController.getProductosByClub = async (request, response) => {
    try {
        const clubId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            logger.error('\t> Error: getProductosByClub: Invalid club ID (productoController.js)');
            return response.status(400).json({ message: 'Invalid club ID' });
        }

        const productos = await Producto.find({ club: clubId });
        if (!productos || productos.length === 0) {
            logger.error('\t> Error: getProductosByClub: No se encontraron productos para este club (productoController.js)');
            return response.status(404).json({ message: 'No se encontraron productos para este club' });
        }

        logger.info('\t> getProductosByClub: Todos los productos del club obtenidos (productoController.js)');
        response.json(productos);
    } catch (error) {
        logger.error('\t> Error: getProductosByClub: obtener los productos del club (productoController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener los productos del club' });
    }
}

// Actualizar producto
productoController.updateProducto = async (request, response) => {
    try {
        const { existencias, diferencia } = request.body;
        await Producto.findByIdAndUpdate(request.params.id, {
            existencias,
            diferencia
        });
        logger.info('\t> updateProducto: Producto actualizado (productoController.js)');
        response.json({ message: 'Producto actualizado' });
    } catch (error) {
        logger.error('\t> Error: updateProducto: Actualizar un producto (productoController.js): ' + error);
        response.status(500).json({ message: 'Error al actualizar un producto' });
    }
}

module.exports = productoController;