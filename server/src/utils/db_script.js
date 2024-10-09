const { MongoClient } = require('mongodb');

// Conexión a MongoDB Atlas (cambia los valores según tu configuración)
const uri = "mongodb+srv://albertmorser:hjzwzrkDEO4BGEwe@clustermdb.4fi43.mongodb.net/galaxy_club?retryWrites=true&w=majority&appName=ClusterMDB";

async function run() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('galaxy_club');

        // Crear colecciones
        await database.createCollection("clubs");
        await database.createCollection("djs");
        await database.createCollection("ingresos");
        await database.createCollection("mejoras");
        await database.createCollection("productos");
        await database.createCollection("tecnicos");
        await database.createCollection("usuarios");

        // Insertar documentos en clubs
        await database.collection("clubs").insertMany([
            {
                _id: ObjectId("66e49d559bdb5e631a4fde59"),
                fama: 0,
                propietario: "Cutiti007",
                ubicacion: "Del Perro",
                ganancias_almacen: 0,
                ganancias_club: 0,
                ganancias_totales: 0,
                trabajos: 0,
                ventas_almacen: 0,
                celebridades: 0,
                publico: "Vacío",
                visitas: 0,
                ingresos_hoy: 0,
                caja_fuerte: 0,
                productos_vendidos: 0
            }
        ]);

        // Insertar documentos en djs
        await database.collection("djs").insertMany([
            {
                _id: ObjectId("66e815706baa95fd2a837f75"),
                name: "Solomun",
                residente: true,
                contratado: true
            },
            {
                _id: ObjectId("66e815966baa95fd2a837f76"),
                name: "Tale Of Us",
                residente: false,
                contratado: false
            },
            {
                _id: ObjectId("66e815aa6baa95fd2a837f77"),
                name: "Dixon",
                residente: false,
                contratado: false
            },
            {
                _id: ObjectId("66e815bd6baa95fd2a837f78"),
                name: "The Black Madonna",
                residente: false,
                contratado: false
            }
        ]);

        // Insertar documentos en ingresos
        await database.collection("ingresos").insertMany([
            {
                _id: ObjectId("66e4a0d39bdb5e631a4fde5d"),
                dia: "L",
                value: 0,
                avg_temp: 0
            },
            {
                _id: ObjectId("66e4a1289bdb5e631a4fde5f"),
                dia: "M",
                value: 0,
                avg_temp: 0
            },
            {
                _id: ObjectId("66e4a1469bdb5e631a4fde60"),
                dia: "X",
                value: 0,
                avg_temp: 0
            },
            {
                _id: ObjectId("66e4a1949bdb5e631a4fde61"),
                dia: "J",
                value: 0,
                avg_temp: 0
            },
            {
                _id: ObjectId("66e4a1b49bdb5e631a4fde62"),
                dia: "V",
                value: 0,
                avg_temp: 0
            },
            {
                _id: ObjectId("66e4a1d69bdb5e631a4fde63"),
                dia: "S",
                value: 0,
                avg_temp: 0
            },
            {
                _id: ObjectId("66e4a1e69bdb5e631a4fde64"),
                dia: "D",
                value: 0,
                avg_temp: 0
            }
        ]);

         // Insertar documentos en mejoras
         await database.collection("mejoras").insertMany([
            {
                _id: ObjectId("66e33fe1e64fd92fe53dae2e"),
                name: "Equipo",
                comprada: false,
                precio: 1425000,
                imagen: "/img/mejoras/mejora1-equipo.jpg",
                descripcion: "Compra esta mejora para instalar equipo de mayor calidad. Esto aumentará la productividad de los técnicos del almacén y les permitirá acumular productos más rápidamente."
            },
            {
                _id: ObjectId("66e40e669bdb5e631a4fde57"),
                name: "Personal",
                comprada: false,
                precio: 475000,
                imagen: "/img/mejoras/mejora2-personal.jpg",
                descripcion: "Compra esta mejora para contratar más bármanes y gorilas. Esto reducirá la pérdida de fama diaria del club nocturno."
            },
            {
                _id: ObjectId("66e41ada9bdb5e631a4fde58"),
                name: "Seguridad",
                comprada: false,
                precio: 695000,
                imagen: "/img/mejoras/mejora3-security.jpg",
                descripcion: "Compra esta mejora para colocar guardias de seguridad y equipo de vigilancia. Esto reducirá las posibilidades de que los enemigos ataquen el club nocturno."
            },
        ]);

        // Insertar documentos en productos
        await database.collection("productos").insertMany([
            {},
        ]);

        // Insertar documentos en tecnicos
        await database.collection("tecnicos").insertMany([
            {
                _id: ObjectId("66ed57c2e403a475ca048832"),
                name: "tecnico1",
                estado: "CONTRATADO",
                imagen: "/img/tecnicos/tecnico1.png",
                salario: 0,
                producto: "",
                club: ObjectId("66e49d559bdb5e631a4fde59")
            },
        ]);

        // Insertar documentos en usuarios
        await database.collection("usuarios").insertMany([
            {
                _id: ObjectId("66e3419e9c1f8a854b1b6470"),
                username: "Cutiti007",
                password: "$argon2id$v=19$m=65536,t=3,p=4$2358vhb51KLAlDjz07kLBg$vhpgBhHeledfhlgCJvbH92uZuZM0kRYuutTfKFKEKtg",
                club: ObjectId("66e49d559bdb5e631a4fde59"),
                imagen: "img/user/profile-default.png"
            },
        ]);

        console.log("Colecciones y documentos creados con éxito");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

// ejecutar directorio > node db_script.js