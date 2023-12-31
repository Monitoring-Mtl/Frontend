import React, { useCallback, useEffect } from "react";
import * as d3 from "d3";
import { Arc } from "@/types/Arc";
import { Onyx } from "@/utils/color-utils";

interface IPieChart {
    arcs: Arc[];
    colors: string[];
    labelCallback: any;
    tooltipCallback: any;
}

type Margin = { top: number; bottom: number };

export default function PieChart({
    arcs,
    colors,
    labelCallback,
    tooltipCallback
}: IPieChart) {
    const container = React.useRef<HTMLDivElement>(null);
    const svg = React.useRef<SVGSVGElement>(null);
    const overlay = React.useRef<HTMLDivElement>(null);

    const computeFontSize = (width: number, height: number) =>
        Math.min(width, height) / 25;

    const computeOuterRadius = (width: number, height: number, margin: Margin) =>
        Math.min(width, height) / 2 - (margin.top + margin.bottom);

    const drawChart = useCallback(
        (
            svgRef: React.RefObject<SVGSVGElement>,
            overlayRef: React.RefObject<HTMLDivElement>,
            width: number,
            height: number,
            margin: Margin
        ) => {
            d3.select(svgRef.current).select("g").remove();

            const overlay = d3
                .select(overlayRef.current)
                .style("position", "fixed")
                .style("display", "none");

            const svg = d3
                .select(svgRef.current)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width * 0.5}, ${height * 0.5})`);

            const radius = computeOuterRadius(width, height, margin);

            const arcGenerator: any = d3
                .arc()
                .innerRadius(0)
                .outerRadius(radius);

            const pieGenerator = d3
                .pie()
                .padAngle(0)
                .value((d) => d.valueOf())
                .sort(null);

            const arc = svg
                .selectAll()
                .data(pieGenerator(arcs.map((d) => d.value)))
                .enter();

            const hasOneArc = arcs.filter(x => x.value > 0).length == 1;

            arc
                .append("path")
                .attr("d", arcGenerator)
                .attr("class", "graph-element")
                .style("fill", (_, i) => colors[i])
                .style("stroke", Onyx)
                .style("stroke-width", hasOneArc ? 0 : 2);

            if (hasOneArc){
                arc.append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", radius)
                    .style("fill", "none")
                    .style("stroke", Onyx)
                    .style("stroke-width", 1.7);
            }

            arc
                .append("text")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("class", "graph-element")
                .text((d: any, i) => labelCallback(d.data, i))
                .style("font-size", `${computeFontSize(width, height)}px`)
                .style("font-weight", "bold")
                .attr("transform", (d) => {
                    const [x, y] = arcGenerator.centroid(d);
                    return `translate(${x}, ${y})`;
                });

            svg
                .selectAll(".graph-element")
                .on("mouseover", function (event, d: any) {
                    overlay
                        .html(tooltipCallback(d.data, d.index))
                        .style("left", event.clientX + 10 + "px")
                        .style("top", event.clientY - 40 + "px")
                        .style("display", "block");
                })
                .on("mousemove", function (event, _) {
                    overlay
                        .style("left", event.clientX + 10 + "px")
                        .style("top", event.clientY - 40 + "px");
                })
                .on("mouseout", function () {
                    overlay.style("display", "none");
                });
        },
        [colors, arcs, labelCallback, tooltipCallback]
    );

    const render = useCallback(() => {
        const margin: Margin = {
            top: 10,
            bottom: 10,
        };

        let width = 400;
        let height = 400;

        if (container.current) {
            width = container.current.offsetWidth;
            height = container.current.offsetHeight;
        }

        drawChart(svg, overlay, width, height, margin);
    }, [drawChart, svg, overlay, container]);

    useEffect(() => {
        render();
    }, [render]);

    render();
    if (typeof window !== "undefined") {
        window.addEventListener("resize", render);
    }

    return (
        <div ref={container} className="w-full h-full">
            <svg ref={svg} />
            <div
                ref={overlay}
                className="bg-white border border-black rounded-lg px-2 py-2 opacity-90 hidden"
            ></div>
        </div>
    );
}
