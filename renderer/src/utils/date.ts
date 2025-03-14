import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formatRelativeTime = (dateString: string) => {
  if (!dateString) return '';

  const date = dayjs(dateString);
  const now = dayjs();
  const diffDays = now.diff(date, 'day');

  if (diffDays >= 3) {
    return date.format('YY.MM.DD');
  }

  return date.fromNow();
};
