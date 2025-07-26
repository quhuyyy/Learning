import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { StoreProvider } from './store';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>
);