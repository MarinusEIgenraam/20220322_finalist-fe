////////////////////
//// Build
import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import mockData from "../../mockData/TreeData.json"
import styled from 'styled-components'
import { arcStyles } from "../../styles/arcstyles";

////////////////////
//// Environmental

////////////////////
//// External


export default function IndentedTree({ data, dimensions }) {
    // React hooks
    const svgRef = useRef();
    const wrapperRef = useRef();
    // Measures
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const nodeSize = 17;
    let i = 0

    console.log(data)
    const root = d3.hierarchy(mockData).eachBefore(d => d.index = i++)






    return             <svg ref={ svgRef } width={ svgWidth } />

}


/** Created by ownwindows on 28-03-22 **/
