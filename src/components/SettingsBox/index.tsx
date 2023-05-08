import { SettingsBoxProps } from './types';

export const SettingsBox = ({ title, icon, children }: SettingsBoxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xl font-semibold">
        {title} {icon}
      </div>
      <div>{children}</div>
    </div>
  );
};
