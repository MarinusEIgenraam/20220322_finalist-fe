import './App.css';
import IndentedTree from "./components/IndentedTree";
import styled from 'styled-components';
import Chart from "./Views/Chart";
import Practice from "./Views/Practice";

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

const chartData = {};

function App() {
  return (
      <>
          <header className="App-header">
              Finalist project data
          </header>
          <ViewPort className="App">
              <Practice/>

          </ViewPort>
      </>

  );
}

const ViewPort = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
`


export default App;
