const { Schema, model } = require('mongoose');

const ingresoSchema = new Schema({
    dia: String,
    value: Number,
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El ingreso debe estar asignado a un club']
    }
},
    {
        collection: 'ingresos'
    },
    {
        timestamps: true
    }
);

module.exports = model('Ingreso', ingresoSchema);
