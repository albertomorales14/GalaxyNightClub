const { Schema, model } = require('mongoose');
const { config } = require('../config');
const { DEFAULT_PROFILE_IMAGE } = require('../constants');

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // Nunca se devuelve en las consultas salvo que se pida explícitamente
    },
    imagen: {
        type: String,
        default: DEFAULT_PROFILE_IMAGE
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El usuario debe estar asignado a un club']
    }
}, {
    collection: 'usuarios',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
});

// URL pública de la imagen de perfil en Cloudinary
usuarioSchema.virtual('imagenUrl').get(function () {
    if (!config.cloudinary.cloudName) return null;
    return `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/upload/${this.imagen || DEFAULT_PROFILE_IMAGE}`;
});

module.exports = model('Usuario', usuarioSchema);
