import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Error';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary msg="Something went wrong...">
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
