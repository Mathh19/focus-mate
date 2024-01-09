import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContextProps } from './types';
import { api } from '../../services/api';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const loadingStoredData = async () => {
      const storedToken = Cookies.get('auth_token');

      if (storedToken) {
        setSigned(true);
      }
    };
    loadingStoredData();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });

    if (response.data.error) {
      return response.data.error;
    }

    const { token } = response.data;

    setSigned(true);
    api.defaults.headers.common['Authorization'] = token;
    Cookies.set('auth_token', token, { expires: 3, secure: true });
  };

  const logout = async () => {
    setSigned(false);
    Cookies.remove('auth_token');
    location.reload();
  };

  const deleteAccount = async () => {
    await api.delete('/user');
    setSigned(false);
    Cookies.remove('auth_token');
  };

  return (
    <AuthContext.Provider value={{ signed, signIn, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
