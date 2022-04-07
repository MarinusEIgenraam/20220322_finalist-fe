import './App.css';
import styled from 'styled-components';
import Practice from "./Views/Practice";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import ProjectDetails from "./Views/ProjectDetails";
import ArcDiagram from "./components/feature/ArcDiagram";
import { useContext, useEffect, useState } from "react";
import { fetchProjectFiles } from "./helpers/DataController";
import Error from "./components/shared/Error";
import Footer from "./components/shared/Footer";
import { UtilityContext } from "./context/UtilityProvider";
import ProjectOverview from "./Views/ProjectOverview";
import Landing from "./Views/Landing";
import About from "./Views/About";

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

const chartData = {};

function App() {
    const { hasError } = useContext(UtilityContext);


    return (
      <Container>
          <Navbar/>
          <Routes>
              <Route path='/' element={ <Landing/> }/>
              {/*<Route path='/practice' element={ <Practice/> }/>*/}
              <Route path='/projects' element={ <ProjectOverview/> }/>
              <Route path='/projects/:id' element={ <ProjectDetails/> }/>
              <Route path='/about' element={ <About/> }/>
          </Routes>
          { hasError &&
              <Error/>
          }
          <Footer/>
      </Container>

  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`


export default App;
