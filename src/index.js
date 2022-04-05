import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UtilityContext from "./context/UtilityProvider";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <UtilityContext>
              <App/>
          </UtilityContext>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

