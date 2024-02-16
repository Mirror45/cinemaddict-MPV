import FilmView from "../view/film.js";
import FilmDetailsView from "../view/film-details.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";

export default class Task {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmData) {
    this._filmData = filmData;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmView(filmData);
    this._filmDetailsComponent = new FilmDetailsView(filmData);

    this._filmComponent.setPopupClickHandler(this._handleFilmClick);
    this._filmDetailsComponent.setRemovePopupClickHandler(this._handleRemove);
    this._filmComponent.setWatchListClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._filmListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._filmListContainer.getElement().contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      remove(this._filmDetailsComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _setPopup() {
      render(this._filmListContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _removePopup() {
      remove(this._filmDetailsComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFilmClick() {
    this._setPopup();
  }

  _handleRemove() {
    this._removePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._filmData,
        {
          isWatchList: !this._filmData.isWatchList,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._filmData,
        {
          isWatched: !this._filmData.isWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._filmData,
        {
          isFavorite: !this._filmData.isFavorite,
        },
      ),
    );
  }
}


