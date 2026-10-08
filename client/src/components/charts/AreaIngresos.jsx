import { useState } from 'react';
import useElementSize from '../../hooks/useElementSize';
import ChartTooltip from './ChartTooltip';
import formatCurrency from '../../Utils/formatCurrency';

const MARGEN = { top: 24, right: 24, bottom: 24, left: 64 };
const TAM_ROMBO = 18;

// Escala "bonita" para el eje Y: múltiplo de 1, 2 o 5 por potencia de 10
const maximoEje = (valor) => {
    if (valor <= 0) return 1;
    const potencia = 10 ** Math.floor(Math.log10(valor));
    const paso = [1, 2, 5, 10].find(m => m * potencia >= valor);
    return paso * potencia;
};

// Gráfico de área con los ingresos de los últimos 7 días
function AreaIngresos({ ingresos }) {

    const [ref, { width, height }] = useElementSize();
    const [activo, setActivo] = useState(null);

    const ancho = width - MARGEN.left - MARGEN.right;
    const alto = height - MARGEN.top - MARGEN.bottom;
    const max = maximoEje(Math.max(...ingresos.map(ingreso => ingreso.value), 0));
    const paso = ingresos.length > 1 ? ancho / (ingresos.length - 1) : 0;

    const puntos = ingresos.map((ingreso, i) => ({
        ...ingreso,
        x: MARGEN.left + (ingresos.length > 1 ? i * paso : ancho / 2),
        y: MARGEN.top + alto * (1 - ingreso.value / max)
    }));

    const linea = puntos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const area = puntos.length
        ? `${linea} L${puntos.at(-1).x},${MARGEN.top + alto} L${puntos[0].x},${MARGEN.top + alto} Z`
        : '';
    const marcasEje = [0, 0.25, 0.5, 0.75, 1].map(f => ({ valor: max * f, y: MARGEN.top + alto * (1 - f) }));

    const punto = activo !== null ? puntos[activo] : null;

    return (
        <div ref={ref} className="chart" onMouseLeave={() => setActivo(null)}>
            {width > 0 && height > 0 && (
                <svg width={width} height={height} role="img" aria-label="Ingresos diarios de la última semana">
                    {marcasEje.map(({ valor, y }) => (
                        <g key={valor}>
                            <line className="chart-grid" x1={MARGEN.left} x2={width - MARGEN.right} y1={y} y2={y} />
                            <text className="chart-axis-label" x={MARGEN.left - 8} y={y} textAnchor="end" dominantBaseline="middle">
                                {formatCurrency(valor)}
                            </text>
                        </g>
                    ))}
                    <path d={area} className="chart-area" />
                    <path d={linea} className="chart-line" />
                    {puntos.map((p, i) => (
                        <rect key={p._id ?? p.dia}
                            x={p.x - TAM_ROMBO / 2} y={p.y - TAM_ROMBO / 2} width={TAM_ROMBO} height={TAM_ROMBO}
                            transform={`rotate(45 ${p.x} ${p.y})`}
                            className={`chart-marker ${activo === i ? 'is-active' : ''}`}
                            onMouseEnter={() => setActivo(i)} />
                    ))}
                </svg>
            )}
            {punto && <ChartTooltip x={punto.x} y={punto.y} label="Ingresos" value={'$' + formatCurrency(punto.value)} />}
        </div>
    );
}

export default AreaIngresos;
