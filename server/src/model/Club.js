const { Schema, model } = require('mongoose');
const { PUBLICO } = require('../constants');

const contador = { type: Number, default: 0, min: 0 };

const clubSchema = new Schema({
    fama: { type: Number, default: 0, min: 0, max: 100 },
    propietario: { type: String, required: true, trim: true },
    ubicacion: { type: String, default: 'Del Perro Beach' },
    ganancias_almacen: contador,
    ganancias_club: contador,
    ganancias_totales: contador,
    trabajos: contador,
    ventas_almacen: contador,
    celebridades: contador,
    publico: { type: String, enum: PUBLICO, default: 'Vacío' },
    visitas: contador,
    ingresos_hoy: contador,
    caja_fuerte: contador,
    productos_vendidos: contador,
    productos_acumulados: contador
}, {
    collection: 'clubs',
    timestamps: true
});

module.exports = model('Club', clubSchema);
