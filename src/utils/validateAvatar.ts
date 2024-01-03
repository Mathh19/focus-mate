export enum FileTypes {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  GIF = 'image/gif',
}

export const validateAvatar = (file: File) => {
  const allowedFileTypes: FileTypes[] = [
    FileTypes.JPEG,
    FileTypes.PNG,
    FileTypes.SVG,
    FileTypes.GIF,
  ];
  const limitSize = 1024 * 1024 * 20;
  if (!allowedFileTypes.includes(file.type as FileTypes)) {
    return 'Invalid file type. Only jpeg, png, svg and gif are allowed.';
  }
  if (file.size > limitSize) {
    return 'The file size cannot be greater than 20MB.';
  }
  return true;
};
