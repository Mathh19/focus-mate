import { Logo } from '../Logo';
import { About } from '../About';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-4 py-3">
      <Logo />
      <About />
    </header>
  );
};
