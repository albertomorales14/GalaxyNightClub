const { Schema, model } = require('mongoose')

ObjectId = Schema.ObjectId;
const tecnicoSchema = new Schema({
    name: String,
    estado: String,
    club: ObjectId,
    imagen: String,
    salario: Number,
    producto: String
},
{
    timestamps: true
})

module.exports = model('Tecnico', tecnicoSchema)
