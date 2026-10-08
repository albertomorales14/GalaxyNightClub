import { useMemo } from "react";
import { AgCharts } from "../../Utils/charts";
import { renderer2 } from "../../Utils/renderChartTooltip";

// Gráfico de área con los ingresos de los últimos 7 días
function IngresosChart({ lista }) {

    const options = useMemo(() => ({
        data: lista,
        series: [
            {
                type: "area", xKey: "dia", yKey: "value", fill: "#251032",
                tooltip: { enabled: false }
            },
            {
                type: "line", xKey: "dia", yKey: "value", stroke: "#9479A6",
                marker: {
                    fill: "#251032",
                    size: 30,
                    stroke: "#9479A6",
                    strokeWidth: 3,
                    shape: "diamond"
                },
                tooltip: { enabled: true, renderer: renderer2 }
            }
        ],
        tooltip: { showArrow: false },
        axes: {
            x: { type: "category", position: "bottom", label: { enabled: false } },
            y: { type: "number", position: "left", label: { enabled: true } }
        },
        background: { fill: "transparent" },
        legend: { enabled: false }
    }), [lista]);

    return <div className="line-chart-container galaxy-chart"><AgCharts options={options} /></div>;
}

export default IngresosChart;
