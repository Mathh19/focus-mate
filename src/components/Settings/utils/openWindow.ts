export const openWindow = (width: number, height: number) => {
  const localUrl = window.location.href;
  const left = window.screenLeft - window.innerWidth - width - 10;
  const top = window.screenTop + window.innerHeight - height - 10;
  window.open(
    localUrl,
    'Pomodoro',
    `width=${width}, height=${height}, left=${left} top=${top}`,
  );
};
