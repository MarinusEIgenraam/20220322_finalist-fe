////////////////////
//// Build
import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import data from "../mockData/data.json"
import styled from 'styled-components'

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
    const root = d3.hierarchy(data).eachBefore(d => d.index = i++)


    const format = d3.format(",")

    const columns = [
        {
            label: "Size",
            value: d => d.value,
            format,
            x: 280
        },
        {
            label: "Count",
            value: d => d.children ? 0 : 1,
            format: (value, d) => d.children ? format(value) : "-",
            x: 340
        }
    ]


    useEffect(() => {
        const nodes = root.descendants();
        const svgUse = d3.select(svgRef.current)
        svgUse.selectAll("*").remove(); // Clear svg content before adding new elements

        const svg = svgUse
            .attr("viewBox", [ -nodeSize / 2, -nodeSize * 3 / 2, width, ( nodes.length + 1 ) * nodeSize ])
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .style("overflow", "visible");


        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "var(--primary)")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d => `
        M${ d.source.depth * nodeSize },${ d.source.index * nodeSize }
        V${ d.target.index * nodeSize }
        h${ nodeSize }
      `);

        const node = svg.append("g")
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

        for (const { label, value, format, x } of columns) {
            svg.append("text")
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
            console.log(root)
        }
    });

    return (
        <SvgWrapper ref={ wrapperRef } style={ { marginBottom: "2rem" } }>
            <svg ref={ svgRef }/>
        </SvgWrapper>
    )
}

const SVG = styled.svg`
  width: 100%;
`

const SvgWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

/** Created by ownwindows on 28-03-22 **/
