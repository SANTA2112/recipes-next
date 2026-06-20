import Link from 'next/link';

import { ROUTES } from '@/constants';
import { generatePagination } from '@/utils/pagination';

interface Props {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const Pagination = (props: Props) => {
  const { page, totalPages } = props;

  const linkClassName =
    'block min-w-8 py-1 bg-linear-to-r from-orange-400 to-red-500 text-white text-sm rounded-full shadow-sm text-center hover:opacity-100 transition-opacity duration-200';

  const paginationArray = generatePagination(page, totalPages).map((item, index) => {
    if (item === '...') {
      return (
        <span key={`ellipsis-${index}`} className="opacity-80">
          ...
        </span>
      );
    }

    const arrPage = item as number;
    return (
      <Link
        href={ROUTES.recipesPage(arrPage)}
        className={arrPage !== page ? `${linkClassName} opacity-80` : linkClassName}
        key={arrPage}
      >
        {arrPage}
      </Link>
    );
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {page !== 1 && (
        <Link className={linkClassName} href={ROUTES.recipesPage(page - 1)}>
          &#171;
        </Link>
      )}
      {paginationArray}
      {page !== totalPages && (
        <Link className={linkClassName} href={ROUTES.recipesPage(page + 1)}>
          &#187;
        </Link>
      )}
    </div>
  );
};
