import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PomodoroProvider } from './contexts/PomodoroContext/PomodoroContext';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { TasksProvider } from './contexts/TasksContext/TasksContext';

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
