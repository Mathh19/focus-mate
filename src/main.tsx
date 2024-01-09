import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { PomodoroProvider } from './contexts/PomodoroContext/PomodoroContext';
import { TasksProvider } from './contexts/TasksContext/TasksContext';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { NotFound } from './pages/NotFound';
import { ProfilePage } from './pages/ProfilePage';
import { Home } from './pages/Home';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PomodoroProvider>
        <TasksProvider>
          <HelmetProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<App />}>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </TasksProvider>
      </PomodoroProvider>
    </AuthProvider>
  </React.StrictMode>,
);
