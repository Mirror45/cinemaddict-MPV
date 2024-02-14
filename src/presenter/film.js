import FilmView from "../view/film.js";
import FilmDetailsView from "../view/film-details.js";
import { render, RenderPosition, remove } from "../utils/render.js";

export default class Task {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmData) {
    this._filmData = filmData;

    this._filmComponent = new FilmView(filmData);
    this._filmDetailsComponent = new FilmDetailsView(filmData);

    this._filmComponent.setPopupClickHandler(this._handleFilmClick);
    this._filmDetailsComponent.setRemovePopupClickHandler(this._handleRemove);

    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
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
}
