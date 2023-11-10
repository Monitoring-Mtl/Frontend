"use client";

import React, { useCallback, useEffect } from "react";
import * as d3 from "d3";

//Cette ligne fix l'erreur "document is not defined", mais next s'attend à ce que le svg soit retourné par le serveur
// Cause une autre erreur d'hydration
// if (typeof window !== "undefined") {

interface IPieChart {
  id: string;
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
  id,
  pies,
  renderListener,
  colorRange,
}: IPieChart) {
  const overlayId = "access-ramp-overlay";

  const computeFontSize = (width: number, height: number) =>
    Math.min(width, height) / 25;

  const computeOuterRadius = (width: number, height: number, margin: Margin) =>
    Math.min(width, height) / 2 - (margin.top + margin.bottom);

  const drawChart = useCallback(
    (width: number, height: number, margin: Margin) => {
      d3.select(`#${id}`).select("svg").remove();

      let colorScale: any = d3.scaleOrdinal().range(colorRange);

      const overlay = d3
        .select(`#${overlayId}`)
        .style("position", "absolute")
        .style("display", "none");

      const svg = d3
        .select(`#${id}`)
        .append("svg")
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
        .text((d) => d.value)
        .style("font-size", `${computeFontSize(width, height)}px`)
        .attr("transform", (d) => {
          const [x, y] = arcGenerator.centroid(d);
          return `translate(${x}, ${y})`;
        });

      svg
        .selectAll(".graph-element")
        .on("mouseover", function (event, d: any) {
          const sum: number = pies.reduce((a, b) => a + b.value, 0);
          overlay
            .html(`${((d.data / sum) * 100).toFixed(1)}%`)
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
    [colorRange, id, pies]
  );

  const render = useCallback(() => {
    const margin: Margin = {
      top: 10,
      bottom: 10,
    };
    let width = 400;
    let height = 400;
    const element = document.getElementById(id);
    if (element) {
      width = element.offsetWidth;
      height = element.offsetHeight;
    }

    drawChart(width, height, margin);
  }, [drawChart, id]);

  useEffect(() => {
    render();
  }, [render, renderListener]);

  render();
  window.addEventListener("resize", render);

  return (
    <div
      id={overlayId}
      className="bg-white border rounded-lg px-2 py-2 opacity-90 hidden"
    ></div>
  );
}
