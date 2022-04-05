////////////////////
//// Build
import React from 'react'
import styled from "styled-components";

////////////////////
//// Environmental

////////////////////
//// External

export default function Error() {

    return (
        <ErrorMessage>
            An unexpected error occurred processing you last action, please try again.
        </ErrorMessage>
    )
}

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  min-height: 18px;
  width: 100%;
  color: gray;

  position: fixed;
  bottom: 0;
  box-shadow: 0 5px 15px var(--tertiary);

  max-width: 100%;
  padding: 0.5rem 1rem;
  background: white;
  transition: all 500ms;

  z-index: 1;


`
/** Created by ownwindows on 04-01-22 **/
