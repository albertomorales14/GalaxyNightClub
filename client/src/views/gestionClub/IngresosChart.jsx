import AreaIngresos from "../../components/charts/AreaIngresos";

// Ingresos de los últimos 7 días
function IngresosChart({ lista }) {
    return (
        <div className="line-chart-container">
            <AreaIngresos ingresos={lista} />
        </div>
    );
}

export default IngresosChart;
