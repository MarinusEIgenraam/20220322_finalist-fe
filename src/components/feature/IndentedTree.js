////////////////////
//// Build
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as d3 from "d3";
import { UtilityContext } from "../../context/UtilityProvider";
import axios from "axios";
import { useLocation } from "react-router-dom";

////////////////////
//// Environmental

////////////////////
//// External

//Data formatting
const format = d3.format(",")
const columns = [
    {
        label: "Size in kB",
        value: d => d.filesize,
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

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

export default function IndentedTree({ data }) {
    const history = useLocation()
    const utilityContext = useContext(UtilityContext);

    const CancelToken = axios.CancelToken;
    const [ containerWidth, setContainerWidth ] = useState()

    const svgRef = useRef(null);

    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const nodeSize = 17;

    console.log(data)

    useEffect(() => {

        if (data) {
            renderTree(data)
        }


    }, [ data ]);

    const renderTree = (data) => {
        let i = 0;
        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        const leaves = d3.hierarchy(data).leaves()

        let links = [];
        leaves.forEach((e, i) => {
            links.push({
                id: i,
                source: e.parent.data.name,
                target: e.data.name,
            });
        })


        const root = d3.hierarchy(data).eachBefore(( d => d.index = i++ ));

        const nodes = root.descendants();

        const styles = svg
            .attr("id", "one")
            .attr("zoomAndPan", "diabled")
            .classed("svg-content-responsive", false)

            .attr("viewBox", [ -nodeSize / 2, -nodeSize * 3 / 2, width, ( nodes.length + 1 ) * nodeSize ])
            .attr("font-family", "sans-serif")
            .attr("font-size", "0.8rem")
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

    }

    return <svg ref={ svgRef } width={ svgWidth }/>


}


/** Created by ownwindows on 28-03-22 **/
