import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { PomodoroProvider } from './contexts/PomodoroContext/PomodoroContext';
import { TasksProvider } from './contexts/TasksContext/TasksContext';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PomodoroProvider>
      <TasksProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </TasksProvider>
    </PomodoroProvider>
  </React.StrictMode>,
);
