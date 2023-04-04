import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TimerProvider } from './contexts/TimerContext';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TimerProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </TimerProvider>
  </React.StrictMode>,
);
