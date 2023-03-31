import { Logo } from '../Logo';
import { Modal } from '../Modal';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <Logo />
      <div>
        <Modal />
      </div>
    </header>
  );
};
