import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TimerProvider } from './contexts/TimerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </React.StrictMode>,
);
