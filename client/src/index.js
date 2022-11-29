import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalContextProvider from './context/Global.context';
import UserContextProvider from './context/User.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <GlobalContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>,
);
