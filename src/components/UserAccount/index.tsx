import { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Modal } from '../UI/Modal';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { FormContext } from '../../contexts/FormContext/FormContext';

export const UserAccount = () => {
  const { formMode, toggleFormMode } = useContext(FormContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        aria-label="login"
        onClick={() => setOpen(true)}
        className="rounded-sm bg-skin-base px-2 py-1 font-semibold outline-4"
      >
        Login
      </button>
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="text-xl font-semibold">
            {formMode === 'login' ? 'Sign in' : 'Sign up'}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="close modal"
            className="text-2xl transition duration-200 hover:text-skin-secondary-text"
          >
            <IoClose />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="flex w-full max-w-xs flex-col items-center">
            {formMode === 'login' ? <LoginForm /> : <RegisterForm />}
            <p className="mt-3 w-full text-lg font-medium">
              {formMode === 'login' ? 'First time using ?' : 'Already part ?'}{' '}
              <button
                type="button"
                onClick={toggleFormMode}
                className="cursor-pointer text-skin-secondary-text"
              >
                {formMode === 'login' ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
