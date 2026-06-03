import TrashIcon from '@/assets/icons/trash.svg';
import { Input } from '@/components/ui/input';
import type { Ingredient } from '@/components/ui/recipe-editor/form';

interface Props extends Partial<Ingredient> {
  showRemoveButton?: boolean;
  handleDelete?: () => void;
}

export const IngredientItem = (props: Props) => {
  const { count, title, unit, handleDelete, showRemoveButton } = props;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[60%_1fr_1fr_45px] gap-4">
        <Input noMargin placeholder="Название ингредиента" />
        <Input noMargin placeholder="Кол-во" type="number" />
        <Input noMargin placeholder="г. / ст.л." />
        {showRemoveButton && (
          <button
            type="button"
            className="flex items-center justify-center px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            onClick={handleDelete}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
