const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El usuario debe estar asignado a un club']
    }
},
    {
        collection: 'usuarios'
    },
    {
        timestamps: true
    }
);

module.exports = model('Usuario', usuarioSchema);
