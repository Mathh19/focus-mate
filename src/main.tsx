import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PomodoroProvider } from './contexts/PomodoroContext/PomodoroContext';
import { TasksProvider } from './contexts/TasksContext/TasksContext';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import App from './App';

import './index.css';

const clientId = import.meta.env.VITE_ID_CLIENT;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <PomodoroProvider>
            <TasksProvider>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </TasksProvider>
          </PomodoroProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
