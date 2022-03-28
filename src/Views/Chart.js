////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import IndentedTree from "../components/IndentedTree";

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
            <ViewPort>
                <IndentedTree data={chartData} dimensions={dimensions} />
            </ViewPort>
        </>
    )
}

const ViewPort = styled.div`
  display: flex;
  justify-content: center;
`

/** Created by ownwindows on 28-03-22 **/
