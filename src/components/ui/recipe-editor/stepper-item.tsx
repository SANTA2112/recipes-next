import TrashIcon from '@/assets/icons/trash.svg';
import { DeleteButton } from '@/components/common/buttons/delete';
import type { Instruction } from '@/components/ui/recipe-editor/form';
import { Textarea } from '@/components/common/textarea';

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
      {showRemoveButton && <DeleteButton onClick={handleDelete} />}
    </div>
  );
};
