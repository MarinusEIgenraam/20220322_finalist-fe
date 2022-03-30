////////////////////
//// Build
import React, { useState } from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

////////////////////
//// Environmental

////////////////////
//// External

export default function Navbar() {

    return (
        <Nav>
            <MenuLink to="/practice">Practice</MenuLink>
        </Nav>
    )
}

const Nav = styled.div`
  z-index: 5;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const MenuLink = styled(NavLink)`
  padding: 1rem;
  color: gray;
  transition: all 0.3s ease-in;
  font-size: 1.2rem;

  &.active {
    font-weight: 500;
    color: blue;
  }

  &:hover {
    color: red;
  }

`



/** Created by ownwindows on 30-03-22 **/
