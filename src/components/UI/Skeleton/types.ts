import { ComponentProps } from 'react';

export type SkeletonProps = ComponentProps<'div'> & {
  size?: 'sm' | 'md' | 'lg';
  type: 'circle' | 'rectangle';
};
