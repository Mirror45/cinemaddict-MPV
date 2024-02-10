import {createElement} from '../utils.js';

 const createFilmTemplate = (films) => {
  const { title, raiting, releaseDate, duration, genre, poster, description, isWatchList, isWatched, isFavorite } = films.filmInfo;



  const WatchListClassName = isWatchList
    ? "film-card__controls-item--active"
    : "";

  const WatchedClassName = isWatched
    ? "film-card__controls-item--active"
    : "";

  const FavoriteClassName = isFavorite
    ? "film-card__controls-item--active"
    : "";

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${raiting}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate}</span>
    <span class="film-card__duration">${duration}m</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster"/>
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">5 comments</a>
  <div class="film-card__controls">
    <button
      class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${WatchListClassName}"
      type="button"
    >
      Add to watchlist
    </button>
    <button
      class="film-card__controls-item button film-card__controls-item--mark-as-watched ${WatchedClassName}"
      type="button"
    >
      Mark as watched
    </button>
    <button
      class="film-card__controls-item button film-card__controls-item--favorite ${FavoriteClassName}"
      type="button"
    >
      Mark as favorite
    </button>
  </div>
</article>`;
};

export default class Film {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
