import { FiUpload } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { UploadInputProps } from './types';

export const UploadAvatar = ({ contentImage, ...rest }: UploadInputProps) => {
  const [avatar, setAvatar] = useState(contentImage);

  useEffect(() => {
    setAvatar(contentImage);
  }, [contentImage]);

  return (
    <>
      <label
        htmlFor="avatar"
        className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-4 border-bluishPurple bg-white blueTheme:border-blueTheme dark:border-white dark:bg-darkTheme"
      >
        {avatar !== undefined ||
          (avatar !== null && (
            <FiUpload
              size={40}
              className="absolute text-bluishPurple blueTheme:text-blueTheme dark:text-white"
            />
          ))}
        <input
          {...rest}
          type="file"
          accept="image/*"
          id="avatar"
          name="avatar"
          className="hidden"
        />
        <div className="absolute bottom-0 right-0 z-20 -translate-x-1 rounded-full bg-white text-bluishPurple blueTheme:text-blueTheme dark:bg-darkTheme-grey dark:text-white">
          <IoIosAddCircleOutline size={26} />
        </div>
        <img
          src={avatar ? URL.createObjectURL(avatar) : undefined}
          className="asbolute z-10 aspect-square rounded-full object-cover"
        />
      </label>
      {avatar && (
        <button
          onClick={() => setAvatar(undefined)}
          className="rounded-sm border-2 border-dangerColor px-1.5"
        >
          remove avatar
        </button>
      )}
    </>
  );
};
