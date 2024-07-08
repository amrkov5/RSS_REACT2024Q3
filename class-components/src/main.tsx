import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './App.css';
import ErrorBoundary from './components/Error';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary msg="Something went wrong...">
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
