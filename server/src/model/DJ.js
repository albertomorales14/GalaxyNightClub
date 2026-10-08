const { Schema, model } = require('mongoose');

const djSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
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
        required: [true, 'El DJ debe estar asignado a un club'],
        index: true
    }
}, {
    collection: 'djs',
    timestamps: true
});

module.exports = model('DJ', djSchema);
