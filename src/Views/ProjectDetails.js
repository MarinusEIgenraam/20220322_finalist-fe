////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
import { UtilityContext } from "../context/UtilityProvider";
import IndentedTree from "../components/feature/IndentedTree";
import { useParams } from "react-router-dom";
import { fetchProjectFiles } from "../helpers/DataController";
import ArcDiagram from "../components/feature/ArcDiagram";

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
    const [ projectFiles, setProjectFiles ] = useState();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const utilityContext = useContext(UtilityContext);
    const { id } = useParams();

    const [ visualisation, setVisualisation ] = useState("tree")


    useEffect(() => {
        fetchProjectFiles(utilityContext, id).then((response) => setProjectFiles(response.data.fileInfo))
    }, []);

    useEffect(() => {
        console.log(visualisation)
    },[visualisation]);

    console.log(projectFiles)

    return (
        <>
            <View>
                <Header>Data visualisation</Header>
                <OptionNavigation>
                    <Option onClick={()=>setVisualisation("tree")}>Tree</Option>
                    Hierarchy
                    <Option onClick={()=> setVisualisation("arc")}>Arc</Option>
                </OptionNavigation>
                { ( visualisation === "tree" ) &&
                    <IndentedTree data={ projectFiles } />
                }
                {(visualisation === "arc") &&
                <ArcDiagram data={projectFiles} dimensions={dimensions} />
                }

            </View>
        </>
    )
}

const OptionNavigation = styled.nav`
  margin: 1rem 0;
  vertical-align: baseline;

  display: flex;
`

const Header = styled.h1`
color: var(--primary);
    
`
const View = styled.div`
  margin-top: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Option = styled.button`
  display: inline;
  width: 55px;
  background: transparent;
  border: 2px solid var(--tertiary);

  vertical-align: baseline;
  margin: 0 1rem;
  font-weight: 700;
  font-size: 1rem;
`
/** Created by ownwindows on 28-03-22 **/
