import type { Recipe } from '@/constants/form-state';

interface Props {
  heading: string;
  filling: Recipe['filling'];
}

export const Filling = (props: Props) => {
  const { filling, heading } = props;

  return (
    <div className="mt-4 bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 text-center w-full md:w-fit">
      <h3 className="text-gray-700 font-medium text-3xl"> {heading}</h3>
      {filling.map(({ description, ingredients, title }, i) => (
        <div key={i} className="mb-2 border-b-gray-200 border-b-2 last:border-none pb-2 last:mb-0">
          <h4 className="text-gray-700 font-medium text-2xl">{title}</h4>
          <p className="text-gray-600 mb-2">{description}</p>
          <ul className="space-y-3">
            {ingredients.map(({ count, title, unit }) => (
              <li key={title} className="grid grid-cols-[repeat(2,1fr)] gap-4 items-center justify-center">
                <span className="text-gray-700 text-left">{title}</span>
                <span className="text-gray-500 font-medium text-right md:text-left">
                  {count} {unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
