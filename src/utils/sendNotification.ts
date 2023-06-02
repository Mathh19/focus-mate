export const sendNotification = (
  title: string,
  options?: { body: string; image?: string; icon?: string },
) => {
  return new Notification(title, options);
};
