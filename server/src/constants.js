// Valores fijos del juego compartidos por modelos, validaciones y datos iniciales

const ESTADOS_TECNICO = ['BLOQUEADO', 'NO CONTRATADO', 'CONTRATADO', 'ASIGNADO'];

const PUBLICO = ['Vacío', 'Poca gente', 'Lleno', 'Abarrotado', 'Hasta los topes'];

const PRODUCTOS = [
    'Mercancía y cargamentos',
    'Equipo de caza',
    'Importaciones sudamericanas',
    'Investigaciones farmacéuticas',
    'Productos orgánicos',
    'Fotocopias e impresiones',
    'Imprenta de billetes'
];

const DEFAULT_PROFILE_IMAGE = 'profile-default.png';

module.exports = { ESTADOS_TECNICO, PUBLICO, PRODUCTOS, DEFAULT_PROFILE_IMAGE };
