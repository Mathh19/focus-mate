import { ThemeProps } from '../../shared-types/pomodoro';

export type SelectThemesProps = {
  themeSelected: ThemeProps;
  setTheme: React.Dispatch<ThemeProps>;
};
