import type { Recipe } from '@/constants/form-state';

interface Props extends Pick<Recipe, 'instructions'> {}

export const CookSteps = (props: Props) => {
  const { instructions } = props;

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-2xl mb-6 font-semibold text-gray-800">Приготовление</h2>
        <ol className="space-y-5">
          {instructions.map(({ value }, i) => (
            <li key={i} className="flex gap-4 items-center">
              <span className="shrink-0 w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-md">
                {i + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{value}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
