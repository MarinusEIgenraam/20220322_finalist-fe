////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import IndentedTree from "../components/IndentedTree";
import ArcDiagram from "../components/ArcDiagram";

////////////////////
//// Environmental


////////////////////
//// External

export default function Chart() {
    const dimensions = {
        width: 600,
        height: 300,
        margin: { top: 30, right: 30, bottom: 30, left: 60 }
    };

    const chartData = {};

    return (
        <>
            <View>
                <ArcDiagram data={chartData} dimensions={dimensions} />
            </View>
        </>
    )
}

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

/** Created by ownwindows on 28-03-22 **/
