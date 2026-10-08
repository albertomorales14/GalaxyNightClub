const names = {
    SOLOMUN: "Solomun",
    TALE_OF_US: "Tale Of Us",
    DIXON: "Dixon",
    THE_BLACK_MADONNA: "The Black Madonna",
}

const AUDIO_BASE_URL = 'https://res.cloudinary.com/djxewugx1/video/upload';

// Datos de presentación de cada DJ, en el mismo orden en que los devuelve la API
export const DJS = [
    { name: names.SOLOMUN, imagen: '/img/dj/solomun.webp', audio: `${AUDIO_BASE_URL}/v1728890975/solomun_k3l8kg.mp3` },
    { name: names.TALE_OF_US, imagen: '/img/dj/tale-of-us.webp', audio: `${AUDIO_BASE_URL}/v1728889683/tale-of-us_rbwy70.mp3`, objectPosition: '100% 2%' },
    { name: names.DIXON, imagen: '/img/dj/dixon.webp', audio: `${AUDIO_BASE_URL}/v1728889555/dixon_epu7va.mp3`, objectPosition: '100% 0%' },
    { name: names.THE_BLACK_MADONNA, imagen: '/img/dj/the-black-madonna.webp', audio: `${AUDIO_BASE_URL}/v1728889673/the-black-madonna_e8kwux.mp3`, objectPosition: '100% 25%' }
];

export default names;
