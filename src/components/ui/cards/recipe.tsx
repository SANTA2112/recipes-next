'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { deleteRecipe } from '@/actions/recipe';
import ClockIcon from '@/assets/icons/clock.svg';
import PeopleIcon from '@/assets/icons/people.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Button } from '@/components/common/buttons/button';
import { ErrorMessage } from '@/components/common/error-message';
import { ProxyImage } from '@/components/common/proxy-image';
import { ROUTES } from '@/constants';
import { formatServings, formatTime } from '@/utils/format';
import { notifyLoading } from '@/utils/toasts';

interface Props {
  title: string;
  shortDesc: string;
  cookTime: number;
  servings: number;
  image: string | null;
  id?: string;
}

export const Recipe = (props: Props) => {
  const { cookTime, image, servings, shortDesc, title, id } = props;
  const router = useRouter();
  const [deleteError, setDeleteError] = useState<null | string>(null);

  const handleDeleteRecipe = async (id: string) => {
    setDeleteError(null);
    const toastId = notifyLoading();

    try {
      const { error } = await deleteRecipe({ id });
      setDeleteError(error);
      toast.update(toastId, {
        render: error,
        autoClose: 3000,
        type: 'error',
      });
      if (!error) {
        toast.update(toastId, {
          render: `Рецепт "${title}" успешно удален!`,
          autoClose: 3000,
          type: 'success',
        });
        router.refresh();
      }
    } catch (e) {
      const error = (e as Error).message;
      toast.update(toastId, {
        render: error,
        autoClose: 3000,
        type: 'error',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100">
      <div className="aspect-video overflow-hidden">
        <ProxyImage
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={image ?? ''}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl mb-2 font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{shortDesc}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-orange-500" />
            <span className="shrink-0">{formatTime(cookTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PeopleIcon className="w-4 h-4 text-orange-500" />
            <span className="shrink-0">{formatServings(servings)}</span>
          </div>
        </div>
        {id && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleDeleteRecipe(id)}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-red-50 transition-all cursor-pointer"
            >
              <TrashIcon className="w-4 h-4" style={{ stroke: 'var(--color-red-500)' }} />
            </button>
            <a className="block w-full" href={ROUTES.editRecipe(id)}>
              <Button>Редактировать</Button>
            </a>
          </div>
        )}
        {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
      </div>
    </div>
  );
};
