import { createContext, useState } from 'react';
import { FormContextProps } from './type';

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps,
);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');

  const toggleFormMode = () => {
    formMode === 'login' ? setFormMode('register') : setFormMode('login');
  };

  return (
    <FormContext.Provider value={{ formMode, toggleFormMode }}>
      {children}
    </FormContext.Provider>
  );
};
