
import React, { useEffect} from 'react';
import * as d3 from 'd3';

export const AccessRampGraph = ({id, busData}) => {

    const computeOuterRadius = (width, height, margin) => (Math.min(width, height) / 3) - (margin.top + margin.bottom);
    const computeFontSize = (width, height) => Math.min(width, height) / 40;

    const margin = {
        top: 20, 
        bottom: 20
    };

    let width = 0;
    let height = 0;
    let data;

    const overlayId = "access-ramp-overlay";
    const graphElementClass = "graph-element";

    const render = () => {
        let containerWidth = document.getElementById(id)?.offsetWidth;
        let containerHeight = document.getElementById(id)?.offsetHeight;
        if (containerWidth && containerHeight){
            width = containerWidth;
            height = containerHeight;
        }
        
        let accessRampCount = busData.filter((bus) => bus.hasAccessRamp).length;
        data = [
            {label: "Avec rampe d'accès", value: accessRampCount}, 
            {label: "Sans rampe d'accès", value: busData.length - accessRampCount}
        ];
        drawChart();
    }

    useEffect(() => {
        render();
        window.addEventListener('resize', render)
    }, [busData]);

    const drawChart = () => {
        d3.select(`#${id}`)
        .select('svg')
        .remove();

        let colorScale = d3
            .scaleSequential()      
            .interpolator(d3.interpolateBlues)      
            .domain([0, data.length]);

        const overlay = d3.select(`#${overlayId}`)
            .style('position', 'absolute')
            .style('display', 'none');

        const svg = d3
            .select(`#${id}`)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${Math.max(width * 0.3, 100)}, ${height / 2})`);

        const arcGenerator:any = d3
            .arc()
            .innerRadius(0)
            .outerRadius(computeOuterRadius(width, height, margin));

        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d:any) => d.value);

        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter()
            

        arc
            .append('path')
            .attr('d', arcGenerator)
            .attr("class", graphElementClass)
            .style('fill', (_, i) => colorScale(i))
            .style('stroke', '#ffffff')
            .style('stroke-width', 0);

        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr("class", graphElementClass)
            .text((d:any) => d.data.label)
            .style('fill', "black")
            .style("font-size", `${computeFontSize(width, height)}px`)
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x-10}, ${y})`;
            });

        svg.selectAll(`.${graphElementClass}`)
            .on('mouseover', function (event, d:any) {
                overlay.html(`${(d.data.value / busData.length * 100).toFixed(1)}%`)
                    .style('left', event.clientX + 10 +'px')
                    .style('top', event.clientY - 40 + 'px')
                    .style('display', 'block');
                })
            .on("mousemove", function(event, d) {
                overlay.style('left', event.clientX + 10 +'px')
                .style('top', event.clientY - 40 + 'px')
                })
            .on("mouseout", function () {
                    overlay.style('display', 'none');
                });
    }    

    return (
        <div id={id}>
            <div id={overlayId} className='bg-white border rounded-lg px-2 py-2 opacity-90'>
            </div>
        </div>
    );
}
