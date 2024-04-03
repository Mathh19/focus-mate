import { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Modal } from '../UI/Modal';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { FormContext } from '../../contexts/FormContext/FormContext';
import { Button } from '../UI/Button';

export const UserAccount = () => {
  const { formMode, toggleFormMode } = useContext(FormContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} text="Login" />
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="text-xl font-semibold">
            {formMode === 'login' ? 'Sign in' : 'Sign up'}
          </h2>
          <Button
            onClick={() => setOpen(false)}
            aria-label="close modal"
            icon={
              <IoClose
                size={24}
                className="transition duration-150 group-hover:text-skin-base"
              />
            }
            className="group bg-transparent shadow-none hover:bg-transparent active:bg-transparent"
          />
        </Modal.Header>
        <Modal.Content>
          <div className="flex w-full max-w-xs flex-col items-center">
            {formMode === 'login' ? <LoginForm /> : <RegisterForm />}
            <p className="mt-3 w-full text-lg font-medium">
              {formMode === 'login' ? 'First time using?' : 'Already part?'}{' '}
              <span
                onClick={toggleFormMode}
                className="cursor-pointer text-skin-secondary-text"
              >
                {formMode === 'login' ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
