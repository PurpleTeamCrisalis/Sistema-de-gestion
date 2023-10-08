import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/custom.css';
import { NavPage } from "./pages/NavPage";
import './css/navStyles.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavPage />
  </React.StrictMode>
);
