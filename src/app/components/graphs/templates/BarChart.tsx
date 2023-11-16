import React, { useEffect} from "react";
import {Chart, registerables, Tooltip} from "chart.js"

export const BarChart = ({chartOptions}) => {

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
                    display: true,
                    text: chartOptions.xAxisTitle
                }
            },
            y: {
                beginAtZero:chartOptions.yAxisBeginAt0,
                ticks: { 
                    precision: 0 
                },
                title:{
                    display: true,
                    text: chartOptions.yAxisTitle
                },
                type: "linear"
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
            labels: chartOptions.labels,
            datasets: [{
                data: chartOptions.data,
                borderWidth: 0,
                barPercentage: 0.95,
                categoryPercentage: 1,
                backgroundColor: chartOptions.colors
            }],
            
        };

        let chart
        let context;

        if (canvasRef.current) {
            context = canvasRef.current.getContext("2d");
        }

        if (context){
            chart = new Chart(context, {
                type: "bar",
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