export const generatePagination = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    // Если страниц мало, показываем все
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const prefix = 1;
  const suffix = 1;
  const around = 2;

  const result: (number | string)[] = [];

  // Первые страницы
  for (let i = 1; i <= prefix; i++) {
    result.push(i);
  }

  const aroundStart = currentPage - around + 1;
  const aroundEnd = currentPage + around - 1;

  // Эллипсис перед блоком вокруг текущей, если есть разрыв
  if (prefix + 1 < aroundStart) {
    result.push('...');
  }

  // Блок вокруг текущей (не пересекая с первыми)
  for (let i = aroundStart; i <= aroundEnd; i++) {
    if (i > prefix && i <= totalPages) {
      result.push(i);
    }
  }

  const lastStart = totalPages - suffix + 1;

  // Эллипсис перед последними страницами, если есть разрыв
  if (aroundEnd + 1 < lastStart) {
    result.push('...');
  }

  // Последние страницы (не пересекая с блоком вокруг текущей)
  for (let i = lastStart; i <= totalPages; i++) {
    if (i > aroundEnd) {
      result.push(i);
    }
  }

  return result;
};
