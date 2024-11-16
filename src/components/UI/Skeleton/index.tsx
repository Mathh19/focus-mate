import { twMerge } from 'tailwind-merge';
import { SkeletonProps } from './types';

export const Skeleton = ({ size, type = 'rectangle' }: SkeletonProps) => {
  const variants = {
    avatar: {
      sm: 'w-12 h-12',
      md: 'w-14 h-14',
      lg: 'w-32 h-32',
      xlg: 'w-52 h-52',
    },
  };

  return (
    <div className="flex justify-center gap-5">
      <div
        className={twMerge(
          'relative w-full animate-pulse rounded-md bg-gradient-to-r from-zinc-400 to-zinc-500 p-5',
          `${size && variants.avatar[size]}`,
          `${type === 'circle' && 'rounded-full'}`,
        )}
      ></div>
    </div>
  );
};
