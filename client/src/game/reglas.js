// Reglas del juego compartidas por el ciclo automático (Cron) y las acciones del usuario

export const FAMA_MAX = 100;
export const FAMA_POR_PROMOCION = 25;
export const FAMA_PERDIDA_POR_CICLO = 25;
export const CAJA_FUERTE_MAX = 250000;

export const limitarFama = (fama) => Math.min(FAMA_MAX, Math.max(0, fama));

// Público del club según su fama
export const publicoSegunFama = (fama) =>
    fama === 100 ? 'Hasta los topes'
        : fama >= 75 ? 'Abarrotado'
            : fama >= 50 ? 'Lleno'
                : fama >= 25 ? 'Poca gente'
                    : 'Vacío';

// Ingresos diarios del club según su fama
export const ingresosSegunFama = (fama) =>
    fama === 100 ? 30000
        : fama >= 75 ? 25000
            : fama >= 50 ? 15000
                : fama >= 25 ? 10000
                    : 0;

// Máximo de visitas nuevas por ciclo según la fama
export const maxVisitasSegunFama = (fama) =>
    fama === 100 ? 150
        : fama >= 75 ? 100
            : fama >= 25 ? 25
                : 2;

// Máximo de celebridades nuevas por ciclo según la fama
export const maxCelebridadesSegunFama = (fama) =>
    fama === 100 ? 5
        : fama >= 70 ? 3
            : fama >= 50 ? 2
                : fama >= 25 ? 1
                    : 0;

export const aleatorioHasta = (max) => Math.floor(Math.random() * max);

// Valor de venta de las existencias actuales de un producto
export const valorProducto = (producto) =>
    producto?.capacidadMax ? producto.existencias / producto.capacidadMax * producto.totalValue : 0;
