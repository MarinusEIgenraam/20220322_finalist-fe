////////////////////
//// Build
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import * as d3 from 'd3';

////////////////////
//// Environmental

////////////////////
//// External

export default function CollapsibleTree({data, dimensions}) {
    const ref = useRef(null)
    const {height, width, margin } = dimensions;
    const { top, right, bottom, left } = margin;

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        const svg = d3.select(ref.current);

        // Here the size of each leave is given in the 'value' field in input data
        var root = d3.hierarchy(data).sum(function(d){ return d.value});

        // Then d3.treemap computes the position of each element of the hierarchy
        d3.treemap()
            .size([width, height])
            .paddingTop(28)
            .paddingRight(7)
            .paddingInner(3)      // Padding between each rectangle
            //.paddingOuter(6)
            //.padding(20)
            (root)

        // prepare a color scale
        var color = d3.scaleOrdinal()
            .domain(["boss1", "boss2", "boss3"])
            .range([ "#402D54", "#D18975", "#8FD175"])

        // And a opacity scale
        var opacity = d3.scaleLinear()
            .domain([10, 30])
            .range([.5,1])

        // Select the nodes
        var nodes = svg
            .selectAll("rect")
            .data(root.leaves())

        // animate new additions
        nodes
            .transition().duration(300)
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("opacity", function(d){ return opacity(d.data.value)})
            .style("fill", function(d){ return color(d.parent.data.name)} )

        // draw rectangles
        nodes.enter()
            .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", function(d){ return color(d.parent.data.name)} )
            .style("opacity", function(d){ return opacity(d.data.value)})

        nodes.exit().remove()

        // select node titles
        var nodeText = svg
            .selectAll("text")
            .data(root.leaves())

        // animate new additions
        nodeText
            .transition().duration(300)
            .attr("x", function(d){ return d.x0+5})
            .attr("y", function(d){ return d.y0+20})
            .text(function(d){ return d.data.name.replace('mister_','') })

        // add the text
        nodeText.enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.name.replace('mister_','') })
            .attr("font-size", "19px")
            .attr("fill", "white")

        nodeText.exit().remove()

        // select node titles
        var nodeVals = svg
            .selectAll("vals")
            .data(root.leaves())

        // animate
        nodeVals
            .transition().duration(300)
            .attr("x", function(d){ return d.x0+5})
            .attr("y", function(d){ return d.y0+35})
            .text(function(d){ return d.data.value })

        // add the values
        nodeVals.enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.value })
            .attr("font-size", "11px")
            .attr("fill", "white")

        nodeVals.exit().remove()

        // add the parent node titles
        svg
            .selectAll("titles")
            .data(root.descendants().filter(function(d){return d.depth==1}))
            .enter()
            .append("text")
            .attr("x", function(d){ return d.x0})
            .attr("y", function(d){ return d.y0+21})
            .text(function(d){ return d.data.name })
            .attr("font-size", "19px")
            .attr("fill",  function(d){ return color(d.data.name)} )

        // Add the chart heading
        svg
            .append("text")
            .attr("x", 0)
            .attr("y", 14)    // +20 to adjust position (lower)
            .text("Three group leaders and 14 employees")
            .attr("font-size", "19px")
            .attr("fill",  "grey" )


    }

    return (
        <>
            <NewCollapsibleTree>
                <h3>Collapsible tree</h3>
                <svg ref={ref}>

                </svg>
            </NewCollapsibleTree>
        </>
    )
}

const NewCollapsibleTree = styled.div`

`

/** Created by ownwindows on 30-03-22 **/
