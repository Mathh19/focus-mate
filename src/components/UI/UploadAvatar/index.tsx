import { FiUpload } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { UploadInputProps } from './types';
import { Button } from '../Button';

export const UploadAvatar = ({
  contentImage,
  setPreviewImage,
  ...rest
}: UploadInputProps) => {
  const [avatar, setAvatar] = useState(contentImage);

  const handleRemoveImage = () => {
    setAvatar(undefined);
    setPreviewImage && setPreviewImage(undefined);
  };

  useEffect(() => {
    setAvatar(contentImage);
  }, [contentImage]);

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="avatar"
        className="relative flex h-52 w-52 cursor-pointer items-center justify-center rounded-full border-4 border-skin-base bg-white"
      >
        {avatar !== undefined ||
          (avatar !== null && (
            <FiUpload size={40} className="absolute text-skin-base" />
          ))}
        <input
          {...rest}
          type="file"
          accept="image/*"
          id="avatar"
          name="avatar"
          className="hidden"
        />
        <div className="absolute bottom-0 right-0 z-20 -translate-x-1 rounded-full bg-white text-skin-base">
          <IoIosAddCircleOutline size={26} />
        </div>
        <img
          src={avatar ? URL.createObjectURL(avatar) : undefined}
          className="asbolute z-10 aspect-square w-full rounded-full object-cover"
        />
      </label>
      {avatar && (
        <Button
          type="button"
          text="Remove avatar"
          danger={true}
          onClick={handleRemoveImage}
          className="mt-3 rounded-sm border-2 border-red-600 bg-transparent p-0 px-1.5 text-xl font-normal hover:border-red-700 active:border-red-800 disabled:border-red-900 data-[danger=true]:bg-transparent"
        />
      )}
    </div>
  );
};
