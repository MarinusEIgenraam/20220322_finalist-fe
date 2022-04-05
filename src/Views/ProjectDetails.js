////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { fetchProjectFiles } from "../helpers/DataController";
import ArcDiagram from "../components/feature/ArcDiagram";
import axios from "axios";
import { UtilityContext } from "../context/UtilityProvider";
import IndentedTree from "../components/feature/IndentedTree";

////////////////////
//// Environmental

////////////////////
//// External

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 0, bottom: 30, left: 0 }
};

export default function ProjectDetails() {
    const [projectFiles, setProjectFiles] = useState({});
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const utilityContext = useContext(UtilityContext);

    const [visualisation, setVisualisation] = useState("tree")



    return (
        <>
            <View>
                <h1>Data visualisation</h1>
                {(visualisation === "tree") &&
                    <IndentedTree/>
                }
                {(visualisation === "arc") &&
                    <ArcDiagram projectData={projectFiles} dimensions={dimensions} />
                }

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
