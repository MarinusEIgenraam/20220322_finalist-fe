////////////////////
//// Build
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { QUERIES } from "../../helpers/mediaQueries";

export default function Footer() {
    const [ fixed, setFixed ] = useState(true);

    const changeBackground = () => {
        if (window.scrollY <= 1) {
            setFixed(true);
        } else {
            setFixed(false)
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return function cleanup() {
            window.removeEventListener('scroll', changeBackground)
        }
    }, [])


    return (
        <FooterContainer fixed={ fixed }>
            <FooterContent>
                <FooterWrap>
                    <ContactContainer>
                        <Name>Marinus Eigenraam </Name>
                        <Email>rinuseigenraam@gmail.com </Email>
                        <Telephone>06 36 488 222</Telephone>
                    </ContactContainer>
                </FooterWrap>
            </FooterContent>

        </FooterContainer>
    )
}

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;

`
const ContactContainer = styled.div`
  width:80vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Name = styled.div`
    font-weight: 700;
  padding: 0 1rem 0 0
`

const Email = styled.div`
  padding: 0 1rem 0 0

`

const Telephone = styled.div`
`

export const FooterWrap = styled.div`
  display: flex;
`;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 0.5rem 1rem;
  background: white;
  margin-top: 250px;
  width: 100%;
  transition: all 500ms;

  @media ${ QUERIES.tabletMini } {
    padding: 0rem 2rem;
  }

  ${ ({ hasError, fixed, theme }) => ( !hasError && fixed )
          ?
          {
            "position": "fixed;",
            "bottom": 0,
            "box-shadow": `0 5px 15px var(--tertiary)`
          }
          :
          {
            "position": "relative;",

          }
  }
  transition: 0;
`;


/** Created by ownwindows on 15-01-22 **/

