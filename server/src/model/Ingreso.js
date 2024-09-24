const { Schema, model } = require('mongoose')

const ingresoSchema = new Schema({
    dia: String,
    value: Number,
    avg_temp: Number
},
{
    timestamps: true
})

module.exports = model('Ingreso', ingresoSchema)
