import { Logo } from '../Logo';
import { IoSettingsSharp } from 'react-icons/io5';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <Logo />
      <div>
        <button className="flex items-center gap-2">
          <IoSettingsSharp className="h-7 w-7 fill-purplishGray transition duration-300 ease-in-out hover:-rotate-90" />
        </button>
      </div>
    </header>
  );
};
