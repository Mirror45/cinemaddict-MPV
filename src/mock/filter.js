export const filmToFilterMap = {
  "All movies": (films) => films.filter((film) => film).length,
  Watchlist: (films) =>films.filter((film) => film.filmInfo.isWatchList).length,
  Watched: (films) => films.filter((film) => film.filmInfo.isWatched).length,
  Faforite: (films) => films.filter((film) => film.filmInfo.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
