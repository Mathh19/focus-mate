import { useContext } from 'react';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';

export const Logo = () => {
  const { pomodoro } = useContext(PomodoroContext);

  const logoPath =
    pomodoro.theme === 'defaultTheme'
      ? '/logo-site.svg'
      : pomodoro.theme === 'blueTheme'
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
      <span className=" font-sans text-2xl font-bold max-[380px]:hidden">
        Focus Mate
      </span>
    </div>
  );
};
