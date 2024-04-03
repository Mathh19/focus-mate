import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Modal } from '../UI/Modal';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Button } from '../UI/Button';

export const UserAccount = () => {
  const [open, setOpen] = useState(false);
  const [authState, setAuthState] = useState<'login' | 'register'>('login');

  return (
    <div>
      <Button onClick={() => setOpen(true)} text="Login" />
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="text-xl font-semibold">
            {authState === 'login' ? 'Sign in' : 'Sign up'}
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
            {authState === 'login' ? <LoginForm /> : <RegisterForm />}
            <p className="mt-3 w-full text-lg font-medium">
              {authState === 'login' ? 'First time using?' : 'Already part?'}{' '}
              <span
                onClick={() =>
                  setAuthState(authState === 'login' ? 'register' : 'login')
                }
                className="cursor-pointer text-skin-secondary-text"
              >
                {authState === 'login' ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
