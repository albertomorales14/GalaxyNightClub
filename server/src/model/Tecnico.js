const { Schema, model } = require('mongoose');
const { ESTADOS_TECNICO, PRODUCTOS } = require('../constants');

const tecnicoSchema = new Schema({
    name: { type: String, required: true },
    estado: { type: String, enum: ESTADOS_TECNICO, default: 'BLOQUEADO' },
    imagen: String,
    salario: { type: Number, min: 0 },
    producto: { type: String, enum: ['', ...PRODUCTOS], default: '' },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El tecnico debe estar asignado a un club'],
        index: true
    }
}, {
    collection: 'tecnicos',
    timestamps: true
});

module.exports = model('Tecnico', tecnicoSchema);
