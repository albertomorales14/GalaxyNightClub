require('dotenv').config(); // leer la variable de entorno
const { MongoClient, ObjectId } = require('mongodb');

// Conexión a MongoDB Atlas (cambia los valores según tu configuración)
const URI = 'mongodb+srv://albertmorser:hjzwzrkDEO4BGEwe@clustermdb.4fi43.mongodb.net/galaxy_club?retryWrites=true&w=majority&appName=ClusterMDB';

async function run() {
    const client = new MongoClient(URI);

    try {
        await client.connect();
        const db = client.db('galaxy_club');
        const args = process.argv;

        // Verifica si el ObjectId es válido
        const clubId = args[2]; // El tercer valor de process.argv es el argumento que se pasa
        if (!ObjectId.isValid(clubId)) {
            console.log('ID no válido');
            return;
        }
        // Convertir el string a ObjectId
        const objectId = new ObjectId(clubId);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_djs = db.collection('djs');
        const result1 = await collection_djs.deleteMany({ club: objectId });

        // Mostrar el resultado
        console.log(`${result1.deletedCount} djs eliminados`);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_ingresos = db.collection('ingresos');
        const result2 = await collection_ingresos.deleteMany({ club: objectId });

        // Mostrar el resultado
        console.log(`${result2.deletedCount} ingresos eliminados`);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_mejoras = db.collection('mejoras');
        const result3 = await collection_mejoras.deleteMany({ club: objectId });

        // Mostrar el resultado
        console.log(`${result3.deletedCount} mejoras eliminados`);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_productos = db.collection('productos');
        const result4 = await collection_productos.deleteMany({ club: objectId });

        // Mostrar el resultado
        console.log(`${result4.deletedCount} productos eliminados`);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_tecnicos = db.collection('tecnicos');
        const result5 = await collection_tecnicos.deleteMany({ club: objectId });

        // Mostrar el resultado
        console.log(`${result5.deletedCount} tecnicos eliminados`);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_usuarios = db.collection('usuarios');
        const result6 = await collection_usuarios.deleteMany({ club: objectId });

        // Mostrar el resultado
        console.log(`${result6.deletedCount} usuario eliminado`);

        // Eliminar múltiples documentos usando el campo `club` con ObjectId
        const collection_clubs = db.collection('clubs');
        const result7 = await collection_clubs.deleteMany({ _id: objectId });

        // Mostrar el resultado
        console.log(`${result7.deletedCount} club eliminado`);

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

// ejecutar directorio > node db_script.js