import AbstractView from './abstract.js';

 const createFilmTemplate = (films) => {
  const { title, raiting, releaseDate, duration, genre, poster, description, isWatchList, isWatched, isFavorite} = films;



  const WatchListClassName = isWatchList
    ? "film-card__controls-item--add-to-watchlist film-card__controls-item--active"
    : "film-card__controls-item--add-to-watchlist";

  const WatchedClassName = isWatched
    ? "film-card__controls-item--mark-as-watched film-card__controls-item--active"
    : "film-card__controls-item--mark-as-watched";

  const FavoriteClassName = isFavorite
    ? "film-card__controls-item--favorite film-card__controls-item--active"
    : "film-card__controls-item--favorite";

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
      class="film-card__controls-item button ${WatchListClassName}"
      type="button"
    >
      Add to watchlist
    </button>
    <button
      class="film-card__controls-item button ${WatchedClassName}"
      type="button"
    >
      Mark as watched
    </button>
    <button
      class="film-card__controls-item button ${FavoriteClassName}"
      type="button"
    >
      Mark as favorite
    </button>
  </div>
</article>`;
};

export default class Film extends AbstractView {
  constructor(films) {
    super();
    this._films = films;

    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._films);
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._popupClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}
