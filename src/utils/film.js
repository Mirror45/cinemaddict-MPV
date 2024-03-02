import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const RELEASE_DATE_FORMAT = 'D MMMM YYYY';


export const humanizeReleaseDate = (releaseDate) => {
  return releaseDate ? dayjs(releaseDate).format(RELEASE_DATE_FORMAT) : '';
};

export const convertTimeFormat = (minutes) => {
  return `${parseInt(minutes / 60, 10)}h ${parseInt(minutes % 60, 10)}min`;
};
