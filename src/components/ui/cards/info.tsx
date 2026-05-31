import { Children, isValidElement, type ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

export const Info = (props: Props) => {
  const { title, children, ...rest } = props;

  const mappedDescription = Children.toArray(children).map((child, index) => {
    const key = isValidElement(child) ? child.key : `child-${index}`;

    return (
      <p key={key} className="text-gray-700 text-lg leading-relaxed mb-4 last:mb-0">
        {child}
      </p>
    );
  });

  return (
    <div {...rest} className="bg-white rounded-xl p-8 shadow-sm mb-8 hover:shadow-md transition-shadow">
      <h2 className="text-3xl mb-4">{title}</h2>
      {mappedDescription}
    </div>
  );
};
