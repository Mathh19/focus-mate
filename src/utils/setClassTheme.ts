/* eslint-disable prettier/prettier */
export const setClassTheme = (theme: string) => {
  const htmlElement = document.documentElement;
  htmlElement.classList.remove('blueTheme', 'defaultTheme', 'dark');

  const themeColor =
    theme === 'darkTheme'
      ? '#e8eaee'
      : theme === 'blueTheme'
      ? '#5B74E3'
      : '#7564E2';

  const metaTag = document.querySelector('meta[name="theme-color"]');
  metaTag?.setAttribute('content', themeColor);

  if (theme === 'darkTheme') return htmlElement.classList.add('dark');
  htmlElement.classList.add(theme);
};
