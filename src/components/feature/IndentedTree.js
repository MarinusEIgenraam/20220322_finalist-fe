////////////////////
//// Build
import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";

////////////////////
//// Environmental

////////////////////
//// External

//Data formatting
const format = d3.format(",")
const columns = [
    {
        label: "Size in kB",
        value: d => d?.filesize,
        format,
        x: "80%"
    },
    {
        label: "Files",
        value: d => d.children?.length ? 0 : 1,
        format: (value, d) => d.children ? format(value) : "-",
        x: "96%"
    }
]

export default function IndentedTree({ data, dimensions }) {
    // React hooks
    const svgRef = useRef();
    const wrapperRef = useRef();
    // Measures
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const nodeSize = 17;

    console.log(data.data)

    useEffect(() => {
        let i = 0
        const svg = d3.select(svgRef.current)

        // Create link data
        const leaves = d3.hierarchy(data).leaves()
        console.log(leaves)

        let links = [];
        leaves.forEach((e, i) => {
            links.push({
                id: i,
                source: e.parent?.data.name,
                target: e.data.name,
            });
        })


        // Create colour palet
        // const nodeById = new Map(links.map(d => [ d.id, d ]));
        // const color = d3.scaleOrdinal(leaves.map(d => d.depth).sort(d3.descending), d3.schemeCategory10);

        const root = d3.hierarchy(data).eachBefore(( d => d.index = i++ ));

        const nodes = root.descendants();
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        // General styles
        const styles = svg
            .attr("id", "one")
            .attr("zoomAndPan", "diabled")
            .classed("svg-content-responsive", false)

            .attr("viewBox", [ -nodeSize / 2, -nodeSize * 3 / 2, width, ( nodes.length + 1 ) * nodeSize ])
            .attr("font-family", "sans-serif")
            .attr("font-size", "0.8rem")
            .style("overflow", "visible");

        // Paths
        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "var(--primary)")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d => `
          M${ d.source.depth * nodeSize },${ d.source.index * nodeSize }
          V${ d.target.index * nodeSize }
          h${ nodeSize } // Horizontal
        `);

        const node = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("transform", d => `translate(0,${ d.index * nodeSize })`);

        console.log(node)


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
        }
    },[data]);

    return (
        <>
            <svg ref={ svgRef } width={ svgWidth } />
        </>
    )

}


/** Created by ownwindows on 28-03-22 **/
