import formatCurrency from "./formatCurrency";

// Renderizadores de tooltips para AG Charts (devuelven título y filas de datos)

// Existencias de un producto
export const renderer1 = ({ datum, xKey, yKey }) => ({
    title: String(datum[xKey]).toUpperCase(),
    data: [{ label: 'Unidades en el almacén', value: datum[yKey].toFixed(0) }]
});

// Ingresos de un día
export const renderer2 = ({ datum, yKey }) => ({
    data: [{ label: 'Ingresos', value: '$' + formatCurrency(Math.floor(datum[yKey])) }]
});

// Capacidad restante de un producto
export const renderer3 = ({ datum, xKey, yKey }) => ({
    title: String(datum[xKey]).toUpperCase(),
    data: [{ label: 'Capacidad restante en el almacén', value: datum[yKey].toFixed(0) }]
});
