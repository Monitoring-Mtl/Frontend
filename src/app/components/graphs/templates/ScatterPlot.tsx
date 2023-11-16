import React, { useEffect} from "react";
import {Chart, registerables, Tooltip} from "chart.js"

export const ScatterPlot = ({chartOptions}) => {

    Chart.register(...registerables);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    Tooltip.positioners["cursor"] = (_, coordinates) => ({x:coordinates.x+10, y:coordinates.y-30});

    const options:any = {
        responsive:true,
        maintainAspectRatio:false,
        scales: {
            x:{
                grid: {
                    display: false
                },
                title: {
                    display: false
                },
                ticks: 
                { 
                    display: false 
                },
            },
            y: {
                beginAtZero:chartOptions.yAxisBeginAt0,
                ticks: { 
                    precision: 0 
                },
                title:{
                    display: true,
                    text: chartOptions.yAxisTitle
                }
            }
        },
        plugins: {
            legend: {
                display:false
            },
            tooltip:{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                bodyColor: '#000000',
                bodyFont: {size:16},
                caretSize: 0,
                padding: 10,
                position:"cursor",
                displayColors: false,
                callbacks: {
                    title : () => null,
                    label: chartOptions.tooltipLabelCallBack
                 }
            }
        }
    };

    useEffect(() => {

        const data = {
            datasets: [{
                data: chartOptions.data,
                backgroundColor: chartOptions.colors,
                pointRadius: 5,
            }],
            
        };

        let chart
        let context;

        if (canvasRef.current) {
            context = canvasRef.current.getContext("2d");
        }

        if (context){
            chart = new Chart(context, {
                type: "scatter",
                data: data,
                options: options
            });
        }
        return () => {
            if (chart){
                chart.destroy();
            }
        }
    });


    return (
        <div className="h-full w-full flex justify-center items-center">
            <div ref={containerRef} className="w-4/5 h-4/5 flex justify-center items-center">
                {/* The direct container of the canvas determines its sizing. */}
                <canvas ref={canvasRef} className="mr-10"></canvas>
            </div>
        </div>
    )
}