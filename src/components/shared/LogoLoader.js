////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { UtilityContext } from "../../context/UtilityProvider";

////////////////////
//// Environmental

////////////////////
//// External

function LogoLoader({ navActive }) {
    const { isLoading } = useContext(UtilityContext);
    const [ isTimedOut, setIsTimedOut ] = useState(false)
    const [ navData, setNavData ] = useState()

    const navigate = useNavigate();


    useEffect(() => {
        setIsTimedOut(true)

        const timer = setTimeout(() => {
            setIsTimedOut(false)

        }, 4000);

        return function clearLoader() {
            clearTimeout(timer);
        };

    }, [ isLoading ]);

    return (
        <Logo onClick={ () => navigate("/") } data-text="Marinus" navActive={ navActive } isLoading={ isLoading }
              isTimedOut={ isTimedOut }>
            <h1>
                marinus <span>eigenraam</span>{ ( isLoading || isTimedOut ) && <span>...&nbsp;</span> }
            </h1>
        </Logo>


    )
}

const typeWriter = keyframes`
  to {
    left: 100%;
  }
`


const animation = props =>
    css`
      ${ typeWriter } 4s steps(24) infinite;
    `


const Logo = styled.a`
  text-decoration: none;
  color: var(--secondary);
  position: relative;
  width: max-content;
  margin-right: 2rem;
  padding: 1rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  &::before {
    background: ${ ({ isLoading, isTimedOut, navActive, theme }) => {
      if (( isTimedOut || isLoading ) && navActive) {
        return "white"
      } else if (( isTimedOut || isLoading ) && !navActive) {
        return "white"
      } else {
        return `transparent`
      }
    } };
    animation: ${ ({ isLoading, isTimedOut }) => isLoading || isTimedOut ? animation : 0 };
  }

  span {
    font-weight: 300;
  }
`
export default LogoLoader;

/** Created by ownwindows on 03-01-22 **/
