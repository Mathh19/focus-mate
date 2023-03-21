import { Logo } from '../Logo';
import { IoSettingsSharp } from 'react-icons/io5';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <Logo />
      <div>
        <button className="flex items-center gap-2">
          <IoSettingsSharp className="z-10 h-6 w-6 transition duration-300 ease-in-out hover:-rotate-90" />
        </button>
      </div>
    </header>
  );
};
