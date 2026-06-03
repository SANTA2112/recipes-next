import TrashIcon from '@/assets/icons/trash.svg';
import type { Instruction } from '@/components/ui/recipe-editor/form';
import { Textarea } from '@/components/ui/textarea';

interface Props extends Omit<Instruction, 'id'> {
  index: number;
  handleDelete?: () => void;
  showRemoveButton?: boolean;
}

export const StepperItem = (props: Props) => {
  const { index, value, handleDelete, showRemoveButton } = props;
  return (
    <div className="grid grid-cols-[40px_1fr_45px] gap-3 items-start">
      <div className="shrink-0 h-10 bg-linear-to-br from-orange-400 to-red-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-md mt-1">
        {index}
      </div>
      <Textarea noMargin placeholder={`Опишите шаг ${index}...`} />
      {showRemoveButton && (
        <button
          type="button"
          className="flex items-center justify-center px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
          onClick={handleDelete}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};
