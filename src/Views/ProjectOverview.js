////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { fetchProjectFiles, fetchProjects } from "../helpers/DataController";

////////////////////
//// Environmental
import { UtilityContext } from "../context/UtilityProvider";

////////////////////
//// External

export default function ProjectOverview() {
    const [ projects, setProjects ] = useState();
    const utilityContext = useContext(UtilityContext);

    useEffect(() => {
        fetchProjects(utilityContext).then((response) => setProjects(response.data))
    }, []);

    return (
        <>
            <ol>
                { projects &&
                    projects.map((project,i) => {
                        return (
                            <>
                                <li key={i}>{ project.name }</li>
                            </>
                        )
                    })
                }

            </ol>
        </>
    );
}

const NewProjectOverview = styled.div`

`

/** Created by ownwindows on 06-04-22 **/
