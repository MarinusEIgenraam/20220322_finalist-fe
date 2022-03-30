////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';
import IndentedTree from "../components/feature/IndentedTree";
import ArcDiagram from "../components/feature/ArcDiagram";

////////////////////
//// Environmental

////////////////////
//// External

const dimensions = {
    width: 500,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

export default function VersionControle() {


    const chartData = {};

    return (
        <>
            <View>
                <ArcDiagram
                    dimensions={dimensions}
                />
                <IndentedTree data={chartData} dimensions={dimensions} />
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
