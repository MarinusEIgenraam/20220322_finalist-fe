////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import LogoLoader from "./LogoLoader";

////////////////////
//// Environmental

////////////////////
//// External

export default function Navbar() {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ navActive, setNavActive ] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 30) {
            setNavActive(true);
        } else {
            setNavActive(false)
        }
    };

    window.addEventListener('scroll', changeBackground);

    return (
        <Nav navActive={ navActive }>
            <VieWidth>

                <LogoLoader navActive={ navActive }/>
                <Hamburger onClick={ () => setMenuOpen(!menuOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </Hamburger>
                <Menu menuOpen={ menuOpen } navActive={ navActive }>
                    <MenuLink onClick={ () => setMenuOpen(false) } to="/projects">Projects</MenuLink>
                    {/*<MenuLink onClick={ () => setMenuOpen(false) } to="/practice">Practice</MenuLink>*/}
                    <MenuLink onClick={ () => setMenuOpen(false) } to="/about">About</MenuLink>




                </Menu>
            </VieWidth>

        </Nav>
    )
}

const VieWidth = styled.div`
width: 90vw;
  display: flex;
  justify-content:space-between;
`
const Nav = styled.div`
  z-index: 5;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--tertiary);
  position: relative;


  @media (max-width: 1154px) {
    justify-content: center;
    overflow: hidden;
    flex-direction: column;
    background: white;

    height: ${ ({ menuOpen }) => ( menuOpen ? "100vh" : "0" ) };
    transition: height 0.5s ease-in;
    width: 100%;
  }
`

const MenuLink = styled(NavLink)`
  padding: 1rem;
  color: var(--secondary);
  transition: all 0.3s ease-in;
  font-size: 1.2rem;

  &.active {
    font-weight: 500;
    color: var(--primary);
  }
  &.highlight {
    font-weight: 500;
  }
  &:hover {
    color: var(--tertiary);
  }

`

const Hamburger = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
  align-self: center;
  cursor: pointer;

  span {
    height: 4px;
    width: 25px;
    background: var(--tertiary);
    margin-bottom: 4px;
    border-radius: 5.5px;
  }

  @media (min-width: 1154px) {
    display: none;

  }
`

/** Created by ownwindows on 30-03-22 **/
