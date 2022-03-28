import './App.css';
import IndentedTree from "./components/IndentedTree";

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
        <h2>
            jo
        </h2>
        <div>
            <IndentedTree data={chartData} dimensions={dimensions} />

        </div>
    </div>
  );
}

export default App;
