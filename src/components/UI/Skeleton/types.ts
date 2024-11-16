import { ComponentProps } from 'react';

export type SkeletonProps = ComponentProps<'div'> & {
  size?: 'sm' | 'md' | 'lg' | 'xlg';
  type: 'circle' | 'rectangle';
};
