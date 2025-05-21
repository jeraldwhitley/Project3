import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ApolloProvider from './ApolloProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);