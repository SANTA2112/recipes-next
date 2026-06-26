import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import { Header } from '@/components/ui/authForm/header';
import { formOptionsByType } from '@/constants';
import type { FormType } from '@/constants/types';

interface Props extends ComponentPropsWithoutRef<'div'> {
  type: FormType;
}

export const FormWrapper = (props: Props) => {
  const { children, type, ...rest } = props;
  const { link, linkText, text, description, title } = formOptionsByType[type];

  return (
    <div>
      <Header title={title} description={description} />
      <div {...rest} className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
        {children}
        <div className="mt-6 text-center">
          <p className="flex justify-center gap-2">
            <span className="text-gray-600">{text}</span>
            <Link href={link} className="text-orange-600 hover:text-orange-700 font-medium">
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
