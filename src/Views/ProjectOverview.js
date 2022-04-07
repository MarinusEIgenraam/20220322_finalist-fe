////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { fetchProjects } from "../helpers/DataController";

////////////////////
//// Environmental
import { UtilityContext } from "../context/UtilityProvider";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";

////////////////////
//// External

export default function ProjectOverview() {
    const [ projects, setProjects ] = useState();
    const utilityContext = useContext(UtilityContext);

    useEffect(() => {
        fetchProjects(utilityContext).then((response) => setProjects(response.data))
    }, []);

    const dateTime = (datetime) => {
        return moment(datetime).format('MMMM Do YYYY')
    }

    console.log(projects);
    return (
        <ViewContainer>
            <PageTitle>Project overview</PageTitle>

            <ProjectList>
                { projects &&
                    projects.map((project, i) => {
                        return (
                            <ProjectListItem key={ i }>
                                <ProjectLink to={ `${project.id}` }>{ project.name }</ProjectLink>
                                <MetaData>

                                    <Owner>{ project.owner }</Owner>
                                    <CreationDate>{ dateTime(project.createdAt) }</CreationDate>
                                </MetaData>
                            </ProjectListItem>
                        )

                    })
                }

            </ProjectList>
        </ViewContainer>
    );
}

const ViewContainer = styled.div`
  display: flex;
  width: 80vw;
  flex-direction: column;

  justify-content: center;
  align-self: center;
`

const PageTitle = styled.div`
  margin: 1rem 0;
  font-size: 2rem;

`

const ProjectList = styled.ol`
  padding: 0.25rem 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CreationDate = styled.div`
`
const Owner = styled.div`
  padding: 0 1rem;
  font-weight: 700;
  color: var(--primary);
  
`
const ProjectLink = styled(NavLink)`
  font-weight: 700;
  color: var(--secondary);
  
  .active {
    color: var(--tertiary);
  }
  :visited {
    color: var(--primary);
  }
`

const MetaData = styled.div`
  width: 40%;
  display: flex;
  justify-content: end;
  flex-direction: row;
`

const ProjectListItem = styled.li`
  border-top: 1px solid var(--quaternary);
  border-bottom: 1px solid var(--quaternary);
  
  margin-bottom: 0.5rem;
  padding: .25rem 0;
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
`


/** Created by ownwindows on 06-04-22 **/
