const { Schema, model } = require('mongoose')

ObjectId = Schema.ObjectId;
const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imagen: { type: String},
    club: ObjectId
},
{
    timestamps: true
})

module.exports = model('Usuario', usuarioSchema)
