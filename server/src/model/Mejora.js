const { Schema, model } = require('mongoose');

const mejoraSchema = new Schema({
    name: { type: String, required: true },
    comprada: {
        type: Boolean,
        default: false
    },
    precio: { type: Number, min: 0 },
    imagen: String,
    descripcion: String,
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'La Mejora debe estar asignada a un club'],
        index: true
    }
}, {
    collection: 'mejoras',
    timestamps: true
});

module.exports = model('Mejora', mejoraSchema);
