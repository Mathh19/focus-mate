import { HiCheck } from 'react-icons/hi';
import { SelectThemesProps } from './types';
import { ThemeProps } from '../../contexts/PomodoroContext/types';

export const SelectTheme = ({ themeSelected, setTheme }: SelectThemesProps) => {
  const themes = ['defaultTheme', 'blueTheme', 'darkTheme'] as ThemeProps[];

  return (
    <div className="flex w-full justify-between">
      {themes.map((theme: ThemeProps) => (
        <div
          key={theme}
          onClick={() => setTheme(theme)}
          className={`
        ${theme === 'defaultTheme' && 'bg-bluishPurple'}
        ${theme === 'blueTheme' && 'bg-blueTheme'}
        ${theme === 'darkTheme' && 'bg-darkBackgroundColor'}
        flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg duration-300 ease-in-out hover:brightness-75`}
        >
          {theme === themeSelected && <HiCheck className="z-10 text-2xl" />}
        </div>
      ))}
    </div>
  );
};
