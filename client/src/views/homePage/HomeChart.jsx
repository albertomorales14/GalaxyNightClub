import BarrasExistencias from "../../components/charts/BarrasExistencias";

// Existencias de cada producto frente a su capacidad restante
function HomeChart({ lista }) {
    return <BarrasExistencias productos={lista} />;
}

export default HomeChart;
