export const setClassTheme = (theme: string) => {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove('blueTheme', 'defaultTheme', 'dark');

  if (theme === 'darkTheme') return htmlElement.classList.add('dark');
  htmlElement.classList.add(theme);
};
