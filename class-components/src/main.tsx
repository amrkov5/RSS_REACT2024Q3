import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import ThemeProvider from './components/ThemeContext';
import ConnectError from './components/connectComponent';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ConnectError msg="Something went wrong...">
            <App />
          </ConnectError>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
