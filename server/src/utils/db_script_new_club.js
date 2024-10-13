const { MongoClient, ObjectId } = require('mongodb');

// Conexión a MongoDB Atlas (cambia los valores según tu configuración)
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/dbtest';

async function run() {
    const client = new MongoClient(URI);

    try {
        await client.connect();
        const database = client.db('galaxy_club');

        

        // Insertar documentos en djs
        await database.collection("djs").insertMany([
            {
                name: "Solomun",
                residente: true,
                contratado: true,
                club: new ObjectId('6707f925a95c9e7d4b9f799f')
            },
            {
                name: "Tale Of Us",
                residente: false,
                contratado: false,
                club: new ObjectId('6707f925a95c9e7d4b9f799f')
            },
            {
                name: "Dixon",
                residente: false,
                contratado: false,
                club: new ObjectId('6707f925a95c9e7d4b9f799f')
            },
            {
                name: "The Black Madonna",
                residente: false,
                contratado: false,
                club: new ObjectId('6707f925a95c9e7d4b9f799f')
            }
        ]);


        console.log("Colecciones y documentos creados con éxito");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

// ejecutar directorio > node db_script.js