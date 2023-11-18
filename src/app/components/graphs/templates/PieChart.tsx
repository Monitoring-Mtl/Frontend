"use client";

import React, { useCallback, useEffect } from "react";
import * as d3 from "d3";

interface IPieChart {
  pies: Pie[];
  renderListener?: any;
  colorRange: string[];
}

export type Pie = {
  label: string;
  value: number;
};

type Margin = { top: number; bottom: number };

export default function PieChart({
  pies,
  renderListener,
  colorRange,
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

      let colorScale: any = d3.scaleOrdinal().range(colorRange);

      const sum: number = pies.reduce((a, b) => a + b.value, 0);

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

      const arcGenerator: any = d3
        .arc()
        .innerRadius(0)
        .outerRadius(computeOuterRadius(width, height, margin));

      const pieGenerator = d3
        .pie()
        .padAngle(0)
        .value((d) => d.valueOf());

      const arc = svg
        .selectAll()
        .data(pieGenerator(pies.map((d) => d.value)))
        .enter();

      arc
        .append("path")
        .attr("d", arcGenerator)
        .attr("class", "graph-element")
        .style("fill", (_, i) => colorScale(i))
        .style("stroke", "#ffffff")
        .style("stroke-width", 0);

      arc
        .append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("class", "graph-element")
        .text((d:any) => `${((d.data / sum) * 100).toFixed(1)}%`)
        .style("font-size", `${computeFontSize(width, height)}px`)
        .attr("transform", (d) => {
          const [x, y] = arcGenerator.centroid(d);
          return `translate(${x}, ${y})`;
        });

      svg
        .selectAll(".graph-element")
        .on("mouseover", function (event, d: any) {
          overlay
            .html(`${d.data} autobus`)
            .style("left", event.clientX + 10 + "px")
            .style("top", event.clientY - 40 + "px")
            .style("display", "block");
        })
        .on("mousemove", function (event, d) {
          overlay
            .style("left", event.clientX + 10 + "px")
            .style("top", event.clientY - 40 + "px");
        })
        .on("mouseout", function () {
          overlay.style("display", "none");
        });
    },
    [colorRange, pies]
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
  }, [render, renderListener]);

  render();
  if (typeof window !== "undefined") {
    window.addEventListener("resize", render);
  }

  return (
    <div ref={container} className="w-full h-full">
      <svg ref={svg} />
      <div
        ref={overlay}
        className="bg-white border border-black rounded-lg  px-2 py-2 opacity-90 hidden"
      ></div>
    </div>
  );
}
