import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './components/app/app';
import * as ReactDOMClient from 'react-dom/client';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/stellar-burgers'>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
