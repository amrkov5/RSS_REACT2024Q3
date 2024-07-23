import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import './App.css';
import store from './store';
import ThemeProvider from './components/ThemeContext';
import ConnectError from './components/connectComponent';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConnectError msg="Something went wrong...">
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ConnectError>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
