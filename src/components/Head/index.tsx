import { Helmet } from 'react-helmet-async';
import { HeadProps } from './types';

export const Head = ({ title, icon }: HeadProps) => {
  const titleConfig = title ? `${title} - Focus Mate` : 'Focus Mate';
  const defaultConfig = {
    title: titleConfig,
    icon: '/favico.svg',
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
