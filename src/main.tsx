import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TimerContext } from './contexts/TimerContext';
import './index.css';
import { times } from './times';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TimerContext.Provider value={{ ...times }}>
      <App />
    </TimerContext.Provider>
  </React.StrictMode>,
);
