const { Schema, model } = require('mongoose')

const productoSchema = new Schema({
    name: String,
    capacidadMax: Number,
    existencias: Number,
    totalValue: Number,
    diferencia: Number
},
{
    timestamps: true
})

module.exports = model('Producto', productoSchema)
