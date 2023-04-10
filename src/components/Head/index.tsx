import { Helmet } from 'react-helmet-async';
import { HeadProps } from './types';

export const Head = ({ title, icon }: HeadProps) => {
  const titleConfig = title ? `${title} - Focus mate` : 'Focus mate';
  const defaultConfig = {
    title: titleConfig,
    icon: '/assets/favico.svg',
  };
  return (
    <Helmet>
      <title>{defaultConfig.title}</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href={`${!icon ? defaultConfig.icon : icon}`}
      />
    </Helmet>
  );
};
