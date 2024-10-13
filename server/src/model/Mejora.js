const { Schema, model } = require('mongoose');

const mejoraSchema = new Schema({
    name: String,
    comprada: {
        type: Boolean,
        default: false
    },
    precio: Number,
    imagen: String,
    descripcion: String,
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'La Mejora debe estar asignada a un club']
    }
},
    {
        collection: 'mejoras'
    },
    {
        timestamps: true
    }
);

module.exports = model('Mejora', mejoraSchema);
