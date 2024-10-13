const { Schema, model } = require('mongoose');

const tecnicoSchema = new Schema({
    name: String,
    estado: String,
    imagen: String,
    salario: Number,
    producto: String,
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El tecnico debe estar asignado a un club']
    }
},
    {
        collection: 'tecnicos'
    },
    {
        timestamps: true
    }
);

module.exports = model('Tecnico', tecnicoSchema);
