import { useContext } from 'react';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';

export const Logo = () => {
  const { configPomodoro } = useContext(PomodoroContext);

  const logoPath =
    configPomodoro.theme === 'defaultTheme'
      ? '/logo-site.svg'
      : configPomodoro.theme === 'blueTheme'
      ? '/logo-site-blue-theme.svg'
      : '/logo-site-dark-theme.svg';

  return (
    <div
      onClick={() => location.reload()}
      aria-label="The logo site"
      className="flex cursor-pointer items-center gap-2"
    >
      <img
        className="h-16 w-16"
        src={logoPath}
        alt="An image of the website's logo"
      />
      <span className=" font-sans text-2xl font-bold">Focus Mate</span>
    </div>
  );
};
