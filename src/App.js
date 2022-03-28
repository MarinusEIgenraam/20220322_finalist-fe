import './App.css';
import IndentedTree from "./components/IndentedTree";
import styled from 'styled-components';
import Chart from "./Views/Chart";

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

const chartData = {};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Finalist project data
      </header>
        <Chart/>

    </div>
  );
}


export default App;
