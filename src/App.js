import './App.css';
import styled from 'styled-components';
import Practice from "./Views/Practice";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import VersionControle from "./Views/VersionControle";

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

const chartData = {};

function App() {
  return (
      <Container>
          <Navbar/>
          <Routes>
              <Route path='/practice' element={ <Practice/> }/>
              <Route path='/vcs' element={ <VersionControle/> }/>
          </Routes>
      </Container>

  );
}

const Container = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
`


export default App;
