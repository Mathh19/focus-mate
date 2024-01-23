import { Skeleton } from '../../../UI/Skeleton';

export const SkeletonTasks = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} type="rectangle" />
      ))}
    </div>
  );
};
