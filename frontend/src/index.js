import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    <ToastContainer position="top-right"
    theme={'colored'}
    autoClose={'2500'}
    />
  </Provider>
  </React.StrictMode>
);