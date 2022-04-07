////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental
import { ReactComponent as Ownwindows } from '../../src/styles/images/ownwindows.svg'

////////////////////
//// External

export default function Landing() {

    return (
        <View>
            <LogoRow>
                <TextColumn>
                    <div>
                        <Header>ownwindows</Header>
                    </div>

                    <div>
                        <h4>Finalist <App>Data Visualisation</App></h4>

                        <Name>Marinus Eigenraam</Name>

                    </div>

                </TextColumn>

                <OwnwindowsLogo/>
            </LogoRow>

        </View>
    )
}
const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
`

const Name = styled.h5`
font-weight: 300;
  font-size: 0.8rem;
`

const App = styled.span`
font-weight: 300;
`
const View = styled.div`
  width: 100%;
  margin-top: 1rem;
`

const Header = styled.h1`
  color: var(--primary);
  margin: 0;
  font-size: 3rem;

`

const LogoRow = styled.div`
width: 100vw;
  display: flex;
  justify-content: center;
`


const OwnwindowsLogo = styled(Ownwindows)`
  margin-left: 3rem;
  width: 15%;
`

/** Created by ownwindows on 07-04-22 **/
