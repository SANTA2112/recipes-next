'use client';
import PrintIcon from '@/assets/icons/print.svg';

export const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full hover:shadow-md transition-all hover:border-orange-300 cursor-pointer"
    >
      <PrintIcon className="w-4 h-4 text-orange-600" />
      <span className="font-medium">Печать рецепта</span>
    </button>
  );
};
