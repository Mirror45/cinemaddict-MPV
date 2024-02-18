import FilmBoardView from "../view/film-board.js";
import FilmListView from "../view/film-list.js";
import FilmContainerView from "../view/film-container.js";
import SortView from "../view/sort.js";
import FilmListEmpty from "../view/film-list-empty.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmTopRatedView from "../view/film-top-rated.js";
import FilmMostCommentedView from "../view/film-most-commented.js";
import FilmPresenter from './film.js';
import { render, RenderPosition, remove } from "../utils/render.js";
import {sortByDate, sortByRaiting} from '../utils/sort.js';
import {SortType, UpdateType, UserAction} from '../const.js';

const FILM_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmBoardComponent = new FilmBoardView();
    this._filmListComponent = new FilmListView();
    this._filmContainerComponent = new FilmContainerView();
    this._filmTopRatedComponent = new FilmTopRatedView();
    this._filmMostCommentedComponent = new FilmMostCommentedView();
    this._filmListEmptyComponent = new FilmListEmpty();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {

    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmTopRatedComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmMostCommentedComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRaiting);
    }

    return this._filmsModel.getFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_FILM:
        this._filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this._filmsModel.deleteFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _changeMode() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmBoardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmContainerComponent, this._handleViewAction, this._changeMode);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
      films.forEach((film) => this._renderFilm(film));
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _rendershowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmListEmpty() {
      render(this._filmBoardComponent, this._filmListEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._filmListEmptyComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderFilmListEmpty();
      return;
    }

    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._rendershowMoreButton();
    }
  }
}

