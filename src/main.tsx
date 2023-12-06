import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { PomodoroProvider } from './contexts/PomodoroContext/PomodoroContext';
import { TasksProvider } from './contexts/TasksContext/TasksContext';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PomodoroProvider>
        <TasksProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </TasksProvider>
      </PomodoroProvider>
    </AuthProvider>
  </React.StrictMode>,
);
