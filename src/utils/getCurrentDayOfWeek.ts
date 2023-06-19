export const getCurrentDayOfWeek = () => {
  const date = new Date();
  const options = { weekday: 'long' as const };
  const currentDay = date.toLocaleDateString('en-US', options);
  return currentDay;
};
