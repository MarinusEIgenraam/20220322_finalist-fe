////////////////////
//// Build
import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import data from "../../mockData/data.json"
import styled from 'styled-components'
import { arcStyles } from "../../helpers/arcstyles";

////////////////////
//// Environmental

////////////////////
//// External


export default function IndentedTree({ dimensions }) {

    const svgRef = useRef();
    const wrapperRef = useRef();

    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    const nodeSize = 17;
    let i = 0
    console.log(data)
    const root = d3.hierarchy(data).eachBefore(d => d.index = i++)

    console.log(root)

    const format = d3.format(",")

    const columns = [
        {
            label: "Size",
            value: d => d.value,
            format,
            x: "80%"
        },
        {
            label: "Count",
            value: d => d.children ? 0 : 1,
            format: (value, d) => d.children ? format(value) : "-",
            x: "96%"
        }
    ]



    useEffect(() => {
        const nodes = root.descendants();
        console.log(nodes)
        const svgUse = d3.select(svgRef.current)
        console.log(svgUse)
        svgUse.selectAll("*").remove(); // Clear svg content before adding new elements

        // General styles
        const svg = svgUse
            .attr("viewBox", [ -nodeSize / 2, -nodeSize * 3 / 2, width, ( nodes.length + 1 ) * nodeSize ])
            .classed("svg-content-responsive", false)
            .attr("font-family", "sans-serif")
            .attr("font-size", "0.8rem")
            .append("g")
            .style("overflow", "visible");

        // Paths
        svgUse.append("g")
            .attr("fill", "none")
            .attr("stroke", "var(--primary)")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d => `
        M${ d.source.depth * nodeSize },${ d.source.index * nodeSize }
        V${ d.target.index * nodeSize }
        h${ nodeSize } // Horizontal
      `)
        ;

        const node = svgUse.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("transform", d => `translate(0,${ d.index * nodeSize })`);

        node.append("circle")
            .attr("cx", d => d.depth * nodeSize)
            .attr("r", 2.5)
            .attr("fill", d => d.children ? null : "var(--primary)");

        node.append("text")
            .attr("dy", "0.32em")
            .attr("x", d => d.depth * nodeSize + 6)
            .text(d => d.data.name);

        node.append("title")
            .text(d => d.ancestors().reverse().map(d => d.data.name).join("/"));

        // Stats
        for (const { label, value, format, x } of columns) {
            svgUse.append("text")
                .attr("dy", "0.32em")
                .attr("y", -nodeSize)
                .attr("x", x)
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text(label);

            node.append("text")
                .attr("dy", "0.32em")
                .attr("x", x)
                .attr("text-anchor", "end")
                .attr("fill", d => d.children ? null : "#555")
                .data(root.copy().sum(value).descendants())
                .text(d => format(d.value, d));
        }
    });

    return             <svg ref={ svgRef } width={ svgWidth } />

}


/** Created by ownwindows on 28-03-22 **/
