import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
/* Contexts */
import { AccountsProvider } from './contexts/AccountsContext';
/* Components */
import { UnsplashApp } from './UnsplashApp';
/* Sources */
import './scss/index.scss';

ReactDOM.render(
   <BrowserRouter>
      <AccountsProvider>
         <UnsplashApp />
      </AccountsProvider>
   </BrowserRouter>,
   document.getElementById('root')
);