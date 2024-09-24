const { Schema, model } = require('mongoose')

const mejoraSchema = new Schema({
    name: String,
    comprada: Boolean,
    precio: Number,
    imagen: String,
    descripcion: String
},
{
    collection: 'mejoras'
},
{
    timestamps: true
})

module.exports = model('Mejora', mejoraSchema)
