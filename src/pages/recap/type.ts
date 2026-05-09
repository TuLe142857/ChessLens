import type { RecapData } from './utils.ts';
import type { ComponentType } from 'react';

export type RecapSlideProps = {
  data: RecapData;
  className?: string;
};

export type RecapSlideDefinition = {
  id: string;
  title: string;
  component: ComponentType<RecapSlideProps>;
  canRender: (data: RecapData) => boolean; // slide will be ignored if missing required data to render
};
