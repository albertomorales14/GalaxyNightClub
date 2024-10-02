import formatCurrency from "./formatCurrency";

export const renderer1 = (props) => {
    return {
        title: props.datum[props.xKey].toUpperCase(),
        content: props.datum[props.yKey].toFixed(0) + ' Unidades en el almacén',
    };
}

export const renderer2 = (props) => {
    return {
        content: '$' + formatCurrency(Math.floor(props.datum[props.yKey].toFixed(0)))
    };
}

export const renderer3 = (props) => {
    return {
        title: props.datum[props.xKey].toUpperCase(),
        content: 'Capacidad restante en el almacén: ' + props.datum[props.yKey].toFixed(0),
    };
}
