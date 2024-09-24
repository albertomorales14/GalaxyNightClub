import formatCurrency from "./formatCurrency";

export const renderer1 = ({ datum, xKey, yKey }) => {
    return {
        title: datum[xKey].toUpperCase(),
        content: datum[yKey].toFixed(0) + ' Unidades en el almacén',
    };
}

export const renderer2 = ({ datum, xKey, yKey }) => {
    return {
        content: '$' + formatCurrency(Math.floor(datum[yKey].toFixed(0)))
    };
}

export const renderer3 = ({ datum, xKey, yKey }) => {
    return {
        title: datum[xKey].toUpperCase(),
        content: 'Capacidad restante en el almacén: ' + datum[yKey].toFixed(0),
    };
}
