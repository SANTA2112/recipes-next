import type { ComponentType, SVGProps } from 'react';

import type { ROUTES } from '@/constants';

export interface Achievement {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export type FormType = Extract<keyof typeof ROUTES, 'login' | 'register'>;

interface FormOptionsByType {
  text: string;
  linkText: string;
  link: string;
  title: string;
  description: string;
}

export type FormInfoByPath = Record<FormType, FormOptionsByType>;
