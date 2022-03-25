import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import PlayerPage from "./js/player"
//import reportWebVitals from './js/reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Player" element={<PlayerPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

