const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require("mongoose");

// Conexión a MongoDB Atlas (cambia los valores según tu configuración)
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/dbtest';

async function run() {
    const client = new MongoClient(URI);

    try {
        await client.connect();
        const db = client.db('galaxy_club');
        const collectionDJs = db.collection('djs');

        const id = new ObjectId('670abf07c74cb17bcff77006');
        // Eliminar múltiples documentos usando el campo _id
        await collectionDJs.deleteMany({ club: mongoose.Types.ObjectId("670abf07c74cb17bcff77006") });

    } finally {
        await client.close();
    }
}

run().catch(console.dir);

// ejecutar directorio > node db_script.js