import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  title?: string;
  shortDesc?: string;
  fullDesc?: string;
  image?: string;
  servings?: number;
  cookTime?: number;
}

export const MainForm = (props: Props) => {
  const { cookTime, fullDesc, image, servings, shortDesc, title } = props;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 space-y-6">
      <Input placeholder="Например: Борщ классический" labelText="Название блюда" value={title} />
      <Input placeholder="https://example.com/image.jpg" labelText="Изображение (URL)" value={image} />
      <Input placeholder="Краткое описание для карточки рецепта" labelText="Краткое описание" value={shortDesc} />
      <Textarea
        placeholder="Подробное описание блюда, история, особенности..."
        labelText="Полное описание"
        value={fullDesc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Например: 10" type="number" labelText="Количество порций" value={servings} />
        <Input placeholder="Например: 90" type="number" labelText="Время приготовления (в минутах)" value={cookTime} />
      </div>
    </div>
  );
};
