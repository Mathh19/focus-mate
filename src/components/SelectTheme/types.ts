import { ThemeProps } from '../../contexts/PomodoroContext/types';

export type SelectThemesProps = {
  themeSelected: ThemeProps;
  setTheme: React.Dispatch<ThemeProps>;
};
