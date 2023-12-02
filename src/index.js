import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import GlobalStyle from "./GlobalStyle";
import { Provider } from "react-redux";
import {store} from "./store"
import './firebase'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <HashRouter>
        <GlobalStyle />
        <Provider store={store}>
        <App />
        </Provider>
        </HashRouter>
  </React.StrictMode>
);

