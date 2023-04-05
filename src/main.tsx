import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PomodoroProvider } from './contexts/PomodoroContext';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PomodoroProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PomodoroProvider>
  </React.StrictMode>,
);
