import { UserProps } from '../../../contexts/AuthContext/types';
import { useFetch } from '../../../hooks/useFetch';
import { Skeleton } from '../Skeleton';

export const AvatarProfile = () => {
  const { data, isLoading } = useFetch<UserProps>('/user');
  const avatar = data?.avatar_url;

  if (isLoading) return <Skeleton type="circle" size="md" />;

  return (
    <div className="flex items-center gap-2">
      <p className="max-w-[100px] truncate text-xl font-semibold">
        {data?.username}
      </p>
      <div className="relative">
        <a href="/profile">
          <div className="flex h-14 w-14">
            <img
              src={`${!data?.avatar ? './no-avatar.png' : `${avatar}`}`}
              width={56}
              height={56}
              alt="Profile image"
              className="h-14 w-full rounded-full object-cover object-center p-[2px]"
            />
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-b from-bluishPurple from-10% to-pink blueTheme:from-blueTheme blueTheme:to-blueTheme-light-blue dark:from-white dark:to-white"></div>
        </a>
      </div>
    </div>
  );
};
