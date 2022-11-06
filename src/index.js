import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import PlayerPage from "./js/player"
import { StoreAuth } from "./js/loginOAuth.js"
//import reportWebVitals from './js/reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/callback" element={<StoreAuth />} />
      <Route path="/" element={<App />} />
      <Route path="/player" element={<PlayerPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

