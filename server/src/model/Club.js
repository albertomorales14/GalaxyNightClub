const { Schema, model } = require('mongoose')

const clubSchema = new Schema({
    fama: Number,
    propietario: String,
    ubicacion: String,
    ganancias_almacen: Number,
    ganancias_club: Number,
    ganancias_totales: Number,
    trabajos: Number,
    ventas_almacen: Number,
    celebridades: Number,
    publico: String,
    visitas: Number,
    ingresos_hoy: Number,
    caja_fuerte: Number,
    productos_vendidos: Number
},
{
    timestamps: true
})

module.exports = model('Club', clubSchema)