import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react"; // Graficos
import { renderer1, renderer3 } from "../../Utils/renderChartTooltip";

function HomeChart({ lista }) {

    //const [lista, setLista] = useState([]);
    const [options, setOptions] = useState({})
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        setOptions({
            // Data: Data to be displayed in the chart
            data: lista,
            animation: { enabled: true, duration: 2000 },
            // Series: Defines which chart type and data to use
            // ToolTip: info que se muestra en hover
            // normalizedTo: valor maximo
            // fill: color relleno
            series: [{
                type: "bar",
                xKey: "name",
                yKey: "existencias",
                yName: "EXISTENCIAS",
                stacked: true,
                normalizedTo: 100,
                fill: "#461E5C",
                stroke: "#461E5C",
                label: { enabled: false },
                tooltip: {
                    enabled: true,
                    class: "custom-chart-tooltip",
                    renderer: renderer1
                },
                highlightStyle: {
                    item: { strokeWidth: 0 },
                },
            },
            {
                type: "bar",
                xKey: "name",
                yKey: "diferencia",
                yName: "EXISTENCIAS",
                stacked: true,
                normalizedTo: 100,
                fill: "#100616",
                stroke: "#100616",
                tooltip: {
                    enabled: true,
                    class: "custom-chart-tooltip",
                    renderer: renderer3
                },
                highlightStyle: {
                    item: {
                        fill: '#251032',
                        strokeWidth: 0,
                    },
                    series: {
                        enabled: false,
                        dimOpacity: 'undefined',
                        strokeWidth: 'undefined',
                    },
                },
            },
            ],
            tooltip: {
                enabled: true,
                class: "custom-chart-tooltip",
            },
            axes: [
                {
                    type: "category",
                    position: "bottom",
                    label: {
                        enabled: false,
                        rotation: 270,
                    },
                },
                {
                    type: "number",
                    position: "left",
                    label: { enabled: false }
                },
            ],
            cellRendererParams: {
                sparklineOptions: {
                    type: 'bar',
                    label: {
                        enabled: false,
                        placement: 'insideBase', // positions the labels in the center of the bars
                    }
                },
            },
            legend: { enabled: false },
            background: { fill: "transparent" },
        })
    }, [lista]); // dependencia variable de estado lista

    return <>{!isLoading ? (<AgCharts options={options} />) : (<></>)}</>
}

export default HomeChart;