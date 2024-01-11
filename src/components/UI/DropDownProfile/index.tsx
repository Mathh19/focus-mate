import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { UserProps } from '../../../contexts/AuthContext/types';
import { useFetch } from '../../../hooks/useFetch';

const urlImage = import.meta.env.VITE_IMG_URL;

export const DropDownProfile = () => {
  const { logout } = useContext(AuthContext);
  const { data } = useFetch<UserProps>('/user');
  const [open, setOpen] = useState(false);
  const avatar = `${urlImage + data?.avatar}`;

  return (
    <div className="flex items-center gap-2">
      <p className="max-w-[100px] truncate text-xl font-semibold">
        {data?.username}
      </p>
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="relative">
          <div className="flex h-14 w-14">
            <img
              src={`${!data?.avatar ? './no-avatar.png' : `${avatar}`}`}
              width={56}
              height={56}
              alt="Profile image"
              className="h-14 w-full rounded-full object-cover object-center p-[2px]"
            />
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-b from-bluishPurple from-10% to-pink blueTheme:from-blueTheme blueTheme:to-blueTheme-light-blue dark:from-white dark:to-white"></div>
        </button>
        {open && (
          <div className="absolute flex animate-dropdown flex-col divide-y divide-blueTheme-grey rounded-md bg-darkBlue dark:bg-darkTheme-dark-grey">
            <a href="/profile" className="px-3 py-1.5">
              Profile
            </a>
            <button onClick={logout} className="px-3 py-1.5">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
