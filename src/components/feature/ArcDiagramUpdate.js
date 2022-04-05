////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import * as d3 from "d3";
import treeData from '../../mockData/RealData.json'
import oldData from '../../mockData/NodesLinks.json'
import { UtilityContext } from "../../context/UtilityProvider";
import axios from "axios";
import { arcStyles } from "../../styles/arcstyles";

////////////////////
//// Environmental

////////////////////
//// External

//Data formatting

export default function ArcDiagram({ projectData, dimensions }) {
    const utilityContext = useContext(UtilityContext);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const svgRef = React.useRef(null);

    const [ projectId, setProjectId ] = useState(2);
    const [ graph, setGraph ] = useState([]);
    const [ svgDimensions, setSvgDimensions ] = useState(dimensions)
    const { width, margin } = svgDimensions;
    const step = 14;

    const data = treeData.fileInfo
    console.log(data)

    const setData = (theData)=>{

        const links = []
        const nodes = []

        d3.hierarchy(theData).leaves().forEach((e, i) => {
            links.push({
                source: e.parent.data.name,
                target: e.data.name,
                value: e.data.parentId,
            });
        })

        d3.hierarchy(theData).leaves().forEach((e, i) => {
            nodes.push({
                id: e.data.name,
                group: e.data.parentId,
            });
        })

        return { nodes, links };
    }

    function arc(d) {
        const y1 = d.source.y;
        const y2 = d.target.y;
        const r = Math.abs(y2 - y1) / 2;
        return `M${ margin.left },${ y1 }A${ r },${ r } 0,0,${ y1 < y2 ? 1 : 0 } ${ margin.left },${ y2 }`;
    }

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        console.log(data)
        svg.append("style").text(arcStyles)

        const graph = setData(data)
        console.log(graph)
        console.log(oldData)

        const nodes = oldData.nodes.map(({ id, group }) => ( {
            id,
            sourceLinks: [],
            targetLinks: [],
            group
        } ));

        const nodeById = new Map(nodes.map(d => [ d.id, d ]));

        const links = oldData.links.map(({ source, target, value }) => ( {
            source: nodeById.get(source),
            target: nodeById.get(target),
            value
        } ));

        for (const link of links) {
            const {source, target, value} = link;
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
        }

        const color = d3.scaleOrdinal(oldData.nodes.map(d => d.group).sort(d3.ascending), d3.schemeCategory10);
        const y = d3.scalePoint(oldData.nodes.map(d => d.id).sort(d3.ascending), [ margin.top, height - margin.bottom ]);


        const label = svg.append("g")
            .attr("text-anchor", "start")
            .selectAll("g")
            .data(oldData.nodes)
            .join("g")
            .attr("transform", d => `translate(0,${ d.y = y(d.id) })`)
            .call(g => g.append("text")
                .attr("dy", "0.35em")
                .attr("fill", d => d3.lab(color(d.group)).darker(2))
                .text(d => d.id))
            .call(g => g.append("circle")
                .attr("r", 3)
                .attr("fill", d => color(d.group)));

        const path = svg.insert("g", "*")
            .attr("fill", "none")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(oldData.links)
            .join("path")
            .attr("stroke", d => d.source.group === d.target.group ? color(d.source.group) : "#aaa")
            .attr("d", arc);

        const overlay = svg.append("g")
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .selectAll("rect")
            .data(oldData.nodes)
            .join("rect")
            .attr("width", margin.left + 40)
            .attr("height", step)
            .attr("y", d => y(d.id) - step / 2)
            .on("mouseover", d => {
                svg.classed("hover", true);
                label.classed("primary", n => n === d);
                label.classed("secondary", n => n.sourceLinks.some(l => l.target === d) || n.targetLinks.some(l => l.source === d));
                path.classed("primary", l => l.source === d || l.target === d).filter(".primary").raise();
            })
            .on("mouseout", d => {
                svg.classed("hover", false);
                label.classed("primary", false);
                label.classed("secondary", false);
                path.classed("primary", false).order();
            });

        const t = svg.transition()
            .duration(750);

        label.transition(t)
            .delay((d, i) => i * 20)
            .attrTween("transform", d => {
                const i = d3.interpolateNumber(d.y, y(d.id));
                return t => `translate(${margin.left},${d.y = i(t)})`;
            });

        path.transition(t)
            .duration(750 + graph.nodes.length * 20)
            .attrTween("d", d => () => arc(d));

        overlay.transition(t)
            .delay((d, i) => i * 20)
            .attr("y", d => y(d.id) - step / 2);




    },[data]);

    const height = ( oldData.nodes.length - 1 ) * step + margin.top + margin.bottom;
    const svgWidth = width;
    const svgHeight = height;

    return (
        <>
            <svg ref={ svgRef } width={ svgWidth } height={ svgHeight }/>
        </>
    )

}


/** Created by ownwindows on 28-03-22 **/
