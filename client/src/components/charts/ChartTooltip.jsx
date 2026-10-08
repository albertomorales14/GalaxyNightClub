// Tooltip de las gráficas, posicionado sobre el punto o la barra activa
function ChartTooltip({ x, y, title, label, value }) {
    return (
        <div className="chart-tooltip" style={{ left: x, top: y }} role="tooltip">
            {title && <div className="chart-tooltip-title">{title}</div>}
            <div className="chart-tooltip-row">
                <span className="chart-tooltip-label">{label}</span>
                <span className="chart-tooltip-value">{value}</span>
            </div>
        </div>
    );
}

export default ChartTooltip;
