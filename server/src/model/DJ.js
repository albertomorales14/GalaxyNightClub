const { Schema, model } = require('mongoose');

const djSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true // Remueve espacios en blanco al inicio y al final
    },
    residente: {
        type: Boolean,
        default: false
    },
    contratado: {
        type: Boolean,
        default: false
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El DJ debe estar asignado a un club']
    }
},
    {
        collection: 'djs'
    },
    {
        timestamps: true // Añade auditoría createdAt y updatedAt
    }
);

module.exports = model('DJ', djSchema);
