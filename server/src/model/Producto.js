const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    name: { type: String, required: true },
    capacidadMax: { type: Number, required: true, min: 0 },
    existencias: { type: Number, default: 0, min: 0 },
    totalValue: { type: Number, min: 0 },
    diferencia: { type: Number, default: 0, min: 0 },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El producto debe estar asignado a un club'],
        index: true
    }
}, {
    collection: 'productos',
    timestamps: true
});

module.exports = model('Producto', productoSchema);
