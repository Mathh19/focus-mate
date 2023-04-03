import { Logo } from '../Logo';

export const Header = () => {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between p-2">
      <Logo />
    </header>
  );
};
