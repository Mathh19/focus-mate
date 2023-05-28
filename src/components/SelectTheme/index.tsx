import { HiCheck } from 'react-icons/hi';
import { SelectThemesProps } from './types';
import { ThemeProps } from '../../contexts/PomodoroContext/types';

export const SelectTheme = ({ themeSelected, setTheme }: SelectThemesProps) => {
  const themes = ['defaultTheme', 'blueTheme', 'darkTheme'] as ThemeProps[];

  const handleSelectTheme = (
    e: React.MouseEvent<HTMLButtonElement>,
    theme: ThemeProps,
  ) => {
    e.preventDefault();
    setTheme(theme);
  };

  return (
    <div className="flex w-full justify-between">
      {themes.map((theme: ThemeProps) => (
        <button
          key={theme}
          onClick={(e) => handleSelectTheme(e, theme)}
          className={`
          ${theme === 'defaultTheme' && 'bg-bluishPurple'}
          ${theme === 'blueTheme' && 'bg-blueTheme'}
          ${theme === 'darkTheme' && 'bg-darkBackgroundColor'}
           flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg ring-white duration-300 ease-in-out hover:brightness-75 focus:ring-2`}
          aria-label={`${
            theme === themeSelected ? 'Selected' : 'Select'
          } ${theme} theme`}
        >
          <span className="hidden">{theme}</span>
          {theme === themeSelected && (
            <HiCheck className="z-10 text-2xl" aria-hidden={true} />
          )}
        </button>
      ))}
    </div>
  );
};
