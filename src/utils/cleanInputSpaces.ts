export const cleanInputSpaces = (value: string) => {
  const cleanValue = value.trim().replace(/\s+/g, ' ');
  return cleanValue;
};
