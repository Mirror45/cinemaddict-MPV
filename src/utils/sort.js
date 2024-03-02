import dayjs from 'dayjs';

export const sortByDate = (filmA, filmB) => {
  return dayjs(filmB.film_info.release.date).diff(dayjs(filmA.film_info.release.date));
};

export const sortByRaiting = (filmA, filmB) => {
  return filmB.film_info.total_rating - filmA.film_info.total_rating;
};
