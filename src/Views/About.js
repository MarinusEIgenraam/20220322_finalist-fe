////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export default function About() {

    return (
        <View>
            <PageTitle>Project overview</PageTitle>

            <Libraries>
                <ol>
                    <li>D3 - Visualisation</li>
                    <li>Apache Camel - File watch</li>
                    <li>Spring Boot - Java application</li>

                </ol>
            </Libraries>
        </View>
    )
}

const View = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const PageTitle = styled.div`
  margin: 1rem 0;
  font-size: 2rem;

`

const Libraries = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  ol {
    list-style: none;

    li {
      :before {
        color: var(--primary);
        content: "\\2022"; 
        font-weight: bold;
        display: inline-block; 
        width: 1em; 
        margin-left: -1em; 
      }
    }
  }
`


/** Created by ownwindows on 07-04-22 **/
