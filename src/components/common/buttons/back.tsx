'use client';
import { useRouter } from 'next/navigation';

import ArrowIcon from '@/assets/icons/arrow.svg';

export const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="mb-4 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all cursor-pointer"
    >
      <ArrowIcon className="w-5 h-5" />
      <span>Назад к списку</span>
    </button>
  );
};
