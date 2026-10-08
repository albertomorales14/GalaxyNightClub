import { useMemo } from "react";
import { AgCharts } from "../../Utils/charts"; // Graficos
import { renderer1, renderer3 } from "../../Utils/renderChartTooltip";

// Gráfico de barras apiladas: existencias de cada producto frente a su capacidad restante
function HomeChart({ lista }) {

    const options = useMemo(() => ({
        data: lista,
        series: [
            {
                type: "bar",
                xKey: "name",
                yKey: "existencias",
                yName: "EXISTENCIAS",
                stacked: true,
                normalizedTo: 100,
                fill: "#461E5C",
                stroke: "#461E5C",
                label: { enabled: false },
                tooltip: { enabled: true, renderer: renderer1 }
            },
            {
                type: "bar",
                xKey: "name",
                yKey: "diferencia",
                yName: "CAPACIDAD RESTANTE",
                stacked: true,
                normalizedTo: 100,
                fill: "#100616",
                stroke: "#100616",
                tooltip: { enabled: true, renderer: renderer3 }
            }
        ],
        axes: {
            x: { type: "category", position: "bottom", label: { enabled: false } },
            y: { type: "number", position: "left", label: { enabled: false } }
        },
        legend: { enabled: false },
        background: { fill: "transparent" }
    }), [lista]);

    return <div className="galaxy-chart"><AgCharts options={options} /></div>;
}

export default HomeChart;
