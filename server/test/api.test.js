// Tests de integración de la API contra una base de datos MongoDB de pruebas.
// Requiere MongoDB en local (o MONGODB_URI_TEST). La base de datos se borra al empezar y al terminar.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-que-solo-se-usa-en-los-tests-0123456789';
process.env.CORS_ORIGINS = 'http://localhost:5173';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const request = require('supertest');

const App = require('../src/App');
const { connectDB, disconnectDB } = require('../src/connection');

const TEST_DB = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/galaxy_club_test';
const PASSWORD = 'contraseña-segura-1';

// Registra un usuario y devuelve un agente con su sesión iniciada
async function crearSesion(username) {
    await request(App).post('/api/auth/register').send({ username, password: PASSWORD }).expect(201);
    const agent = request.agent(App);
    await agent.post('/api/auth/login').send({ username, password: PASSWORD }).expect(200);
    return agent;
}

describe('API Galaxy NightClub', () => {
    let alice;
    let bob;

    before(async () => {
        await connectDB(TEST_DB);
        await mongoose.connection.dropDatabase();
        await mongoose.connection.syncIndexes();
        alice = await crearSesion('alice');
        bob = await crearSesion('bob');
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await disconnectDB();
    });

    describe('registro y login', () => {
        it('crea el club con todos sus datos iniciales', async () => {
            const { body: club } = await alice.get('/api/club').expect(200);
            assert.equal(club.propietario, 'alice');

            const cuentas = { djs: 4, mejoras: 3, productos: 7, tecnicos: 5, ingresos: 7 };
            for (const [recurso, total] of Object.entries(cuentas)) {
                const { body } = await alice.get(`/api/${recurso}`).expect(200);
                assert.equal(body.length, total, recurso);
            }
        });

        it('mantiene el orden de los productos', async () => {
            const { body } = await alice.get('/api/productos').expect(200);
            assert.equal(body[0].name, 'Mercancía y cargamentos');
            assert.equal(body[6].name, 'Imprenta de billetes');
        });

        it('rechaza usuarios duplicados', async () => {
            await request(App).post('/api/auth/register').send({ username: 'alice', password: PASSWORD }).expect(409);
        });

        it('exige contraseñas de al menos 8 caracteres', async () => {
            const res = await request(App).post('/api/auth/register').send({ username: 'carol', password: '123' }).expect(400);
            assert.match(res.body.message, /8/);
        });

        it('da el mismo error con usuario inexistente o contraseña incorrecta', async () => {
            const a = await request(App).post('/api/auth/login').send({ username: 'alice', password: 'incorrecta' }).expect(401);
            const b = await request(App).post('/api/auth/login').send({ username: 'nadie', password: 'incorrecta' }).expect(401);
            assert.equal(a.body.message, b.body.message);
        });

        it('bloquea la inyección NoSQL en el login', async () => {
            await request(App).post('/api/auth/login').send({ username: { $ne: null }, password: { $ne: null } }).expect(400);
        });

        it('pone la cookie de sesión como httpOnly', async () => {
            const res = await request(App).post('/api/auth/login').send({ username: 'alice', password: PASSWORD }).expect(200);
            assert.match(res.headers['set-cookie'][0], /HttpOnly/i);
        });

        it('nunca devuelve el hash de la contraseña', async () => {
            const login = await request(App).post('/api/auth/login').send({ username: 'alice', password: PASSWORD }).expect(200);
            assert.equal(login.body.password, undefined);
            const me = await alice.get('/api/auth/me').expect(200);
            assert.equal(me.body.password, undefined);
            assert.equal(me.body.username, 'alice');
        });
    });

    describe('autenticación', () => {
        it('rechaza las rutas protegidas sin sesión', async () => {
            for (const ruta of ['/api/club', '/api/djs', '/api/productos', '/api/tecnicos', '/api/mejoras', '/api/ingresos', '/api/auth/me']) {
                await request(App).get(ruta).expect(401);
            }
            await request(App).delete('/api/auth/account').expect(401);
        });

        it('rechaza un token manipulado', async () => {
            await request(App).get('/api/club').set('Cookie', 'token=eyJhbGciOiJub25lIn0.eyJzdWIiOiIxIn0.').expect(401);
        });

        it('las rutas antiguas sin protección ya no existen', async () => {
            await request(App).get('/api/Usuarios').expect(404);
            await request(App).post('/eliminarCuenta').send({}).expect(404);
        });
    });

    describe('autorización entre clubes', () => {
        it('un usuario no puede modificar productos de otro club', async () => {
            const { body: productosBob } = await bob.get('/api/productos').expect(200);
            await alice.patch(`/api/productos/${productosBob[0]._id}`).send({ existencias: 0 }).expect(404);

            const { body: despues } = await bob.get('/api/productos').expect(200);
            assert.equal(despues[0].existencias, productosBob[0].existencias);
        });

        it('un usuario no puede modificar técnicos de otro club', async () => {
            const { body: tecnicosBob } = await bob.get('/api/tecnicos').expect(200);
            await alice.patch(`/api/tecnicos/${tecnicosBob[1]._id}`).send({ estado: 'CONTRATADO' }).expect(404);
        });
    });

    describe('validación de datos', () => {
        it('actualiza solo los campos permitidos', async () => {
            const { body: djs } = await alice.get('/api/djs').expect(200);
            const res = await alice.patch(`/api/djs/${djs[1]._id}`).send({ contratado: true, club: new mongoose.Types.ObjectId() }).expect(200);
            assert.equal(res.body.contratado, true);
            assert.equal(res.body.club, djs[1].club);
        });

        it('rechaza valores fuera de rango', async () => {
            await alice.patch('/api/club').send({ fama: 150 }).expect(400);
            await alice.patch('/api/club').send({ caja_fuerte: -5 }).expect(400);
            const { body: tecnicos } = await alice.get('/api/tecnicos').expect(200);
            await alice.patch(`/api/tecnicos/${tecnicos[0]._id}`).send({ estado: 'JEFE' }).expect(400);
        });

        it('actualiza el club con valores válidos', async () => {
            const res = await alice.patch('/api/club').send({ fama: 50, publico: 'Lleno' }).expect(200);
            assert.equal(res.body.fama, 50);
            assert.equal(res.body.publico, 'Lleno');
        });
    });

    describe('protección CSRF', () => {
        it('rechaza peticiones que modifican datos desde otro origen', async () => {
            await alice.patch('/api/club').set('Origin', 'https://web-maliciosa.example').send({ fama: 0 }).expect(403);
        });

        it('acepta peticiones del origen del cliente', async () => {
            await alice.patch('/api/club').set('Origin', 'http://localhost:5173').send({ fama: 25 }).expect(200);
        });
    });

    describe('cuenta', () => {
        it('cambia la contraseña solo con la contraseña actual correcta', async () => {
            await alice.put('/api/auth/password').send({ currentPassword: 'incorrecta', newPassword: 'nueva-contraseña-1' }).expect(400);
            await alice.put('/api/auth/password').send({ currentPassword: PASSWORD, newPassword: 'nueva-contraseña-1' }).expect(200);
            await request(App).post('/api/auth/login').send({ username: 'alice', password: 'nueva-contraseña-1' }).expect(200);
        });

        it('elimina la cuenta y todos los datos de su club', async () => {
            const { body: me } = await bob.get('/api/auth/me').expect(200);
            await bob.delete('/api/auth/account').expect(200);

            const restantes = await Promise.all(['djs', 'ingresos', 'mejoras', 'productos', 'tecnicos', 'clubs', 'usuarios']
                .map(col => mongoose.connection.collection(col).countDocuments(col === 'clubs' ? { _id: new mongoose.Types.ObjectId(String(me.club)) } : { club: new mongoose.Types.ObjectId(String(me.club)) })));
            assert.deepEqual(restantes, [0, 0, 0, 0, 0, 0, 0]);

            await request(App).post('/api/auth/login').send({ username: 'bob', password: PASSWORD }).expect(401);
        });
    });

    describe('logs del cliente', () => {
        it('acepta niveles válidos y rechaza el resto', async () => {
            await request(App).post('/api/logs').send({ level: 'info', message: 'hola' }).expect(204);
            await request(App).post('/api/logs').send({ level: 'log', message: 'hola' }).expect(400);
        });
    });
});
