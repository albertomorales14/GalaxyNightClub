const { Schema, model } = require('mongoose');

const ingresoSchema = new Schema({
    dia: { type: String, enum: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], required: true },
    value: { type: Number, default: 0, min: 0 },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El ingreso debe estar asignado a un club'],
        index: true
    }
}, {
    collection: 'ingresos',
    timestamps: true
});

module.exports = model('Ingreso', ingresoSchema);
