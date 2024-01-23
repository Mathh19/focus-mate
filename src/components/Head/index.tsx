import { Helmet } from 'react-helmet-async';
import { HeadProps } from './types';

export const Head = ({ title, icon }: HeadProps) => {
  const titleConfig = title ? `${title}` : 'Pomodoro';
  const defaultConfig = {
    title: titleConfig,
    icon: '/favicon.ico',
  };
  return (
    <Helmet>
      <title>{defaultConfig.title}</title>
      <link
        rel="icon"
        type="image/x-icon"
        href={`${!icon ? defaultConfig.icon : icon}`}
      />
    </Helmet>
  );
};
