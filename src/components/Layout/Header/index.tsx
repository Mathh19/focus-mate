import { useContext } from 'react';
import { Logo } from '../../Logo';
import { About } from '../../About';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { AvatarProfile } from '../../UI/AvatarProfile';
import { UserAccount } from '../../UserAccount';

export const Header = () => {
  const { signed } = useContext(AuthContext);

  return (
    <header className="flex w-full items-center justify-between px-4 py-3">
      <Logo />
      <div className="flex items-center gap-2">
        {signed ? <AvatarProfile /> : <UserAccount />}
        <About />
      </div>
    </header>
  );
};
