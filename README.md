# Galaxy NightClub

Aplicación web MERN (MongoDB, Express, React y Node.js) para gestionar un club nocturno: un almacén de productos, DJs y técnicos que contratar, venta de mercancía y una fama del club que hay que mantener por todo lo alto.

El objetivo del proyecto es aprender, practicar y poner a prueba mis habilidades con las tecnologías del stack MERN, además de HTML, CSS y JavaScript, API REST, integración de librerías, gestión de archivos, audios, gráficos y rutas.

## Tecnologías

| Parte | Tecnologías |
|---|---|
| Cliente (`client/`) | React 19, Vite, React Router 7, React Bootstrap, AG Charts |
| Servidor (`server/`) | Node.js 24, Express 5, Mongoose 9, JWT en cookie httpOnly, Argon2, Cloudinary |
| Calidad | ESLint, tests de integración con `node:test` + Supertest, GitHub Actions |

## Requisitos

- [Node.js](https://nodejs.org/) 22.12 o superior (recomendado 24 LTS)
- [MongoDB](https://www.mongodb.com/try/download/community) en local, o una base de datos en MongoDB Atlas

## Puesta en marcha en local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/albertomorales14/GalaxyNightClub.git
   cd GalaxyNightClub
   ```

2. Configura el servidor: copia `server/.env.example` como `server/.env` y rellena al menos `JWT_SECRET`. Puedes generar uno con:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```

3. Instala las dependencias y arranca el servidor (http://localhost:5050):

   ```bash
   cd server
   npm install
   npm run dev
   ```

4. En otra terminal, instala y arranca el cliente (http://localhost:5173):

   ```bash
   cd client
   npm install
   npm run dev
   ```

   En desarrollo, Vite redirige las peticiones a `/api` al servidor local, así que el cliente no necesita configuración.

## Scripts

| Carpeta | Comando | Descripción |
|---|---|---|
| `server` | `npm run dev` | Servidor con recarga automática |
| `server` | `npm start` | Servidor en modo producción |
| `server` | `npm test` | Tests de integración (necesitan MongoDB en local; usan la base de datos `galaxy_club_test`) |
| `client` | `npm run dev` | Cliente en modo desarrollo |
| `client` | `npm run build` | Compilación de producción en `client/build` |
| `client` | `npm run lint` | Análisis del código con ESLint |

## Despliegue

**Servidor (Render).** Variables de entorno:

| Variable | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas |
| `JWT_SECRET` | Secreto aleatorio de al menos 32 caracteres |
| `CORS_ORIGINS` | URL del cliente en Vercel |
| `TRUST_PROXY` | Número de proxies delante del servidor (Render + rewrite de Vercel = `2`) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Credenciales de Cloudinary |

**Cliente (Vercel).** Directorio raíz `client`, comando de build `npm run build` y directorio de salida `build`. El archivo `client/vercel.json` redirige `/api/*` al servidor de Render, de modo que el cliente y la API comparten origen y la cookie de sesión funciona en todos los navegadores.

## Seguridad

- Sesión con JWT en una cookie `httpOnly`; todas las rutas de datos exigen sesión y solo acceden al club del usuario.
- Contraseñas con Argon2 (mínimo 8 caracteres) y límite de intentos en el login y el registro.
- Validación de todos los datos de entrada, protección frente a inyección NoSQL y CSRF, y cabeceras de seguridad con Helmet.
- Las credenciales van siempre en variables de entorno, nunca en el código.

## API

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Crear cuenta y club |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/me` | Usuario de la sesión |
| PUT | `/api/auth/password` | Cambiar contraseña (`currentPassword`, `newPassword`) |
| PUT | `/api/auth/avatar` | Cambiar imagen de perfil (multipart, campo `image`) |
| DELETE | `/api/auth/account` | Eliminar la cuenta y su club |
| GET, PATCH | `/api/club` | Club del usuario |
| GET, PATCH `/:id` | `/api/djs`, `/api/tecnicos`, `/api/productos`, `/api/mejoras`, `/api/ingresos` | Recursos del club |

## Manual de usuario

Puedes consultar el <a href='https://github.com/albertomorales14/GalaxyNightClub/releases/download/version1/Manual_de_usuario_Galaxy_NightClub.pdf' target="_blank">Manual de usuario</a> en PDF para más detalles sobre el uso de la aplicación y su funcionalidad.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE.md) para más detalles.
