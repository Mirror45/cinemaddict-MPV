import FilmBoardView from "../view/film-board.js";
import FilmListView from "../view/film-list.js";
import FilmContainerView from "../view/film-container.js";
import SortView from "../view/sort.js";
import FilmListEmpty from "../view/film-list-empty.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmTopRatedView from "../view/film-top-rated.js";
import FilmMostCommentedView from "../view/film-most-commented.js";
import FilmPresenter from './film.js';
import {updateItem} from '../utils/common.js';
import { render, RenderPosition, remove } from "../utils/render.js";

const FILM_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};

    this._filmBoardComponent = new FilmBoardView();
    this._filmListComponent = new FilmListView();
    this._filmContainerComponent = new FilmContainerView();
    this._filmTopRatedComponent = new FilmTopRatedView();
    this._filmMostCommentedComponent = new FilmMostCommentedView();
    this._sortComponent = new SortView();
    this._filmListEmptyComponent = new FilmListEmpty();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._changeData = this._changeData.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmTopRatedComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmMostCommentedComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _changeData(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _changeMode() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._filmBoardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmContainerComponent, this._changeData, this._changeMode);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _rendershowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._rendershowMoreButton();
    }
  }

  _renderFilmListEmpty() {
      render(this._filmBoardComponent, this._filmListEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTaskList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderFilmListEmpty();
      return;
    }

    this._renderSort();
    this._renderFilmList();
  }
}

