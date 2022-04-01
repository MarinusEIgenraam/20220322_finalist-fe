////////////////////
//// Build
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import IndentedTree from "../components/feature/IndentedTree";
import { fetchProjectFiles } from "../helpers/DataController";

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
    const [projectFiles, setProjectFiles] = useState({});

    useEffect(() => {
        fetchProjectFiles().then((response) => setProjectFiles(response))
    },[]);



    return (
        <>
            <View>
                <IndentedTree data={projectFiles} dimensions={dimensions} />
                {/*<ArcDiagram*/}
                {/*    dimensions={dimensions}*/}
                {/*/>*/}
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
