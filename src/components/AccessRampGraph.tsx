"use client";

import React, { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import { BusData } from "@/types/stmTypes";

//Cette ligne fix l'erreur "document is not defined", mais next s'attend à ce que le svg soit retourné par le serveur
// Cause une autre erreur d'hydration
// if (typeof window !== "undefined") {

interface IAccessRampGraph {
  id: string;
  busData: BusData[];
  renderListener?: any;
}

type ChartData = {
  label: string;
  value: number;
};

type Margin = { top: number; bottom: number };

export default function AccessRampGraph({
  id,
  busData,
  renderListener,
}: IAccessRampGraph) {
  let accessRampCount = busData.filter((bus) => bus.hasAccessRamp).length;

  const graphElementClass = "graph-element";

  const computeFontSize = (width: number, height: number) =>
    Math.min(width, height) / 25;

  const computeOuterRadius = (width: number, height: number, margin: Margin) =>
    Math.min(width, height) / 2 - (margin.top + margin.bottom);

  const drawChart = useCallback(
    (width: number, height: number, margin: Margin) => {
      const pies: ChartData[] = [
        { label: "Avec rampe d'accès", value: accessRampCount },
        {
          label: "Sans rampe d'accès",
          value: busData.length - accessRampCount,
        },
      ];

      d3.select(`#${id}`).select("svg").remove();

      let colorScale: any = d3.scaleOrdinal().range(["#F8B1B4", "#ef3e45"]);

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
        .attr("class", graphElementClass)
        .style("fill", (_, i) => colorScale(i))
        .style("stroke", "#ffffff")
        .style("stroke-width", 0);

      arc
        .append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("class", graphElementClass)
        .text((d) => d.value)
        .style("font-size", `${computeFontSize(width, height)}px`)
        .attr("transform", (d) => {
          const [x, y] = arcGenerator.centroid(d);
          return `translate(${x}, ${y})`;
        });
    },
    [accessRampCount, busData.length, id]
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

  return <div></div>;
}
