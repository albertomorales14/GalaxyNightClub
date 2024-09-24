const { Schema, model } = require('mongoose')

const djSchema = new Schema({
    name: String,
    residente: Boolean,
    contratado: Boolean,
},
{
    timestamps: true
})

module.exports = model('DJ', djSchema)
