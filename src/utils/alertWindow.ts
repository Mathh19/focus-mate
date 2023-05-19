export const alertWindow = (msg: string) => {
  const alert = window.confirm(msg);
  return alert;
};
