import { useState } from 'react';
import useElementSize from '../../hooks/useElementSize';
import ChartTooltip from './ChartTooltip';

const ALTO = 300;
const MARGEN = 16;
const HUECO = 0.25; // proporción del ancho de cada columna que queda libre entre barras

// Barras apiladas al 100%: existencias de cada producto frente a su capacidad restante
function BarrasExistencias({ productos }) {

    const [ref, { width }] = useElementSize();
    const [activo, setActivo] = useState(null); // { index, parte }

    const anchoColumna = productos.length ? (width - MARGEN * 2) / productos.length : 0;
    const anchoBarra = anchoColumna * (1 - HUECO);
    const altoUtil = ALTO - MARGEN * 2;

    const barras = productos.map((producto, index) => {
        const proporcion = producto.capacidadMax ? producto.existencias / producto.capacidadMax : 0;
        const x = MARGEN + index * anchoColumna + (anchoColumna - anchoBarra) / 2;
        const altoExistencias = altoUtil * proporcion;
        return { producto, x, altoExistencias, yExistencias: MARGEN + altoUtil - altoExistencias };
    });

    const tooltip = activo && barras[activo.index] && (() => {
        const { producto, x, yExistencias } = barras[activo.index];
        const esExistencias = activo.parte === 'existencias';
        return {
            x: x + anchoBarra / 2,
            y: esExistencias ? yExistencias : MARGEN,
            title: producto.name.toUpperCase(),
            label: esExistencias ? 'Unidades en el almacén' : 'Capacidad restante en el almacén',
            value: esExistencias ? producto.existencias : producto.capacidadMax - producto.existencias
        };
    })();

    return (
        <div ref={ref} className="chart" style={{ height: ALTO }} onMouseLeave={() => setActivo(null)}>
            {width > 0 && (
                <svg width={width} height={ALTO} role="img" aria-label="Existencias de cada producto en el almacén">
                    {[0.25, 0.5, 0.75, 1].map(linea => (
                        <line key={linea} className="chart-grid"
                            x1={MARGEN} x2={width - MARGEN}
                            y1={MARGEN + altoUtil * (1 - linea)} y2={MARGEN + altoUtil * (1 - linea)} />
                    ))}
                    {barras.map(({ producto, x, altoExistencias, yExistencias }, index) => (
                        <g key={producto._id ?? producto.name}>
                            <rect x={x} y={MARGEN} width={anchoBarra} height={altoUtil - altoExistencias}
                                className={`chart-bar-resto ${activo?.index === index && activo.parte === 'resto' ? 'is-active' : ''}`}
                                onMouseEnter={() => setActivo({ index, parte: 'resto' })} />
                            <rect x={x} y={yExistencias} width={anchoBarra} height={altoExistencias}
                                className={`chart-bar ${activo?.index === index && activo.parte === 'existencias' ? 'is-active' : ''}`}
                                onMouseEnter={() => setActivo({ index, parte: 'existencias' })} />
                        </g>
                    ))}
                    <line className="chart-axis" x1={MARGEN} x2={width - MARGEN} y1={ALTO - MARGEN} y2={ALTO - MARGEN} />
                </svg>
            )}
            {tooltip && <ChartTooltip {...tooltip} />}
        </div>
    );
}

export default BarrasExistencias;
