const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    name: String,
    capacidadMax: Number,
    existencias: {
        type: Number,
        default: 0
    },
    totalValue: Number,
    diferencia: Number,
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'El producto debe estar asignado a un club']
    }
},
    {
        collection: 'productos'
    },
    {
        timestamps: true
    }
);

module.exports = model('Producto', productoSchema);
