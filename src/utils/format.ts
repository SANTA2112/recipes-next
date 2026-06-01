const pluralize = (count: number, one: string, few: string, many: string) => {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n >= 11 && n <= 14) return many;
  if (n1 === 1) return one;
  if (n1 >= 2 && n1 <= 4) return few;
  return many;
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} ${pluralize(hours, 'час', 'часа', 'часов')}`);
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes} ${pluralize(minutes, 'минута', 'минуты', 'минут')}`);
  }

  return parts.join(' ');
};

export const formatServings = (count: number) => `${count} ${pluralize(count, 'порция', 'порции', 'порций')}`;
