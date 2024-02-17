const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.releaseDate, filmB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return filmB.releaseDate - filmA.releaseDate;
};

export const sortByRaiting = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.raiting, filmB.raiting);

  if (weight !== null) {
    return weight;
  }

  return filmB.raiting - filmA.raiting;
};
