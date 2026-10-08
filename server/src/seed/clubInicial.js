// Datos con los que empieza cada club nuevo al registrarse un usuario

const djs = [
    { name: 'Solomun', residente: true, contratado: true },
    { name: 'Tale Of Us', residente: false, contratado: false },
    { name: 'Dixon', residente: false, contratado: false },
    { name: 'The Black Madonna', residente: false, contratado: false }
];

const mejoras = [
    {
        name: 'Equipo',
        precio: 1425000,
        imagen: '/img/mejoras/mejora1-equipo.jpg',
        descripcion: 'Compra esta mejora para instalar equipo de mayor calidad. Esto aumentará la productividad de los técnicos del almacén y les permitirá acumular productos más rápidamente.'
    },
    {
        name: 'Personal',
        precio: 475000,
        imagen: '/img/mejoras/mejora2-personal.jpg',
        descripcion: 'Compra esta mejora para contratar más bármanes y gorilas. Esto reducirá la pérdida de fama diaria del club nocturno.'
    },
    {
        name: 'Seguridad',
        precio: 695000,
        imagen: '/img/mejoras/mejora3-security.jpg',
        descripcion: 'Compra esta mejora para colocar guardias de seguridad y equipo de vigilancia. Esto reducirá las posibilidades de que los enemigos ataquen el club nocturno.'
    }
];

// El orden importa: el cliente identifica cada producto por su posición
const productos = [
    { name: 'Mercancía y cargamentos', capacidadMax: 50, totalValue: 500000 },
    { name: 'Equipo de caza', capacidadMax: 100, totalValue: 500000 },
    { name: 'Importaciones sudamericanas', capacidadMax: 10, totalValue: 270000 },
    { name: 'Investigaciones farmacéuticas', capacidadMax: 20, totalValue: 229500 },
    { name: 'Productos orgánicos', capacidadMax: 80, totalValue: 300000 },
    { name: 'Fotocopias e impresiones', capacidadMax: 60, totalValue: 250000 },
    { name: 'Imprenta de billetes', capacidadMax: 40, totalValue: 189000 }
].map(producto => ({ ...producto, existencias: producto.capacidadMax, diferencia: 0 }));

const tecnicos = [
    { estado: 'CONTRATADO', salario: 0 },
    { estado: 'NO CONTRATADO', salario: 141000 },
    { estado: 'BLOQUEADO', salario: 184000 },
    { estado: 'BLOQUEADO', salario: 240000 },
    { estado: 'BLOQUEADO', salario: 312000 }
].map((tecnico, index) => ({
    ...tecnico,
    name: `tecnico${index + 1}`,
    imagen: `/img/tecnicos/tecnico${index + 1}.png`,
    producto: ''
}));

const ingresos = ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(dia => ({ dia, value: 0 }));

module.exports = { djs, mejoras, productos, tecnicos, ingresos };
