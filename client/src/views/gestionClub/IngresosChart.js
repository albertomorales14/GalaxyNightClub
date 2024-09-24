import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { renderer2 } from "../../Utils/renderChartTooltip";

export default function IngresosChart() {

    const [lista, setLista] = useState([]);
    const [options, setOptions] = useState({})
    const [isLoading, setLoading] = useState(true);

    // Backend
    useEffect(() => {
        const getIngresos = async () => {
            fetch('http://localhost:5050/api/Ingresos', {
                method: 'GET',
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    // Handle the fetched data here
                    setLista(data)
                    setLoading(false)
                    setOptions({
                        // Data: Data to be displayed in the chart
                        data: lista,
                        // Series: Defines which chart type and data to use
                        // ToolTip: info que se muestra en hover
                        series: [
                            {
                                type: "area", xKey: "dia", yKey: "value", fill: "#251032",
                                highlightStyle: {
                                    series: {
                                        enabled: false
                                    }
                                },
                                label: {
                                    enabled: false,
                                    color: "red",
                                },
                                tooltip: {
                                    enabled: false,
                                }
                            },
                            {
                                type: "line", xKey: "dia", yKey: "value", stroke: "#9479A6",
                                marker: {
                                    fill: "#251032",
                                    size: 30,
                                    stroke: "#9479A6",
                                    strokeWidth: 3,
                                    shape: "diamond",
                                },
                                highlightStyle: {
                                    series: {
                                        enabled: false
                                    }
                                },
                                tooltip: {
                                    enabled: true,
                                    class: "custom-chart-tooltip",
                                    renderer: renderer2
                                }
                            },
                        ],
                        tooltip: {
                            enabled: true,
                            class: "custom-chart-tooltip",
                            showArrow: false,
                        },
                        axes: [
                            {
                                type: "category",
                                position: "bottom",
                                label: {
                                    enabled: false,
                                },
                            },
                            {
                                type: "number",
                                position: "left",
                                label: {
                                    enabled: true,
                                }
                            },
                        ],
                        background: {
                            fill: "transparent",
                        },
                        legend: {
                            enabled: false,
                        },
                    })
                })
                .catch((error) => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getIngresos(); //llamada
    }, [lista]) // dependencia variable de estado lista

    return <>{!isLoading ? (<div className="line-chart-container"><AgCharts options={options} /></div>) : (<></>)}</>
};