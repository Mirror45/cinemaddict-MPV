import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmBoardView from "./view/film-board.js";
import FilmListView from "./view/film-list.js";
import FilmContainerView from "./view/film-container.js";
import FilmView from "./view/film.js";
import FilmDetailsView from "./view/film-details.js";
import FilmListEmpty from "./view/film-list-empty.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmTopRatedView from "./view/film-top-rated.js";
import FilmMostCommentedView from "./view/film-most-commented.js";
import { generateFilm } from "./mock/film.js";
import { generateFilter } from "./mock/filter.js";
import { render, RenderPosition, remove } from "./utils/render.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({ length: FILM_COUNT }, (_) => generateFilm());
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const removeFilmDetails = () => {
    remove(filmDetailsComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      removeFilmDetails();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmComponent.setPopupClickHandler(() => {
    render(siteMainElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmDetailsComponent.setRemovePopupClickHandler(() => {
    removeFilmDetails();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const renderBoard = (boardContainer, boardFilms) => {
  const filmBoardComponent = new FilmBoardView();
  const filmListComponent = new FilmListView();
  const filmLContainerComponent = new FilmContainerView();


  render(boardContainer, filmBoardComponent, RenderPosition.BEFOREEND);
  render(filmBoardComponent, filmListComponent, RenderPosition.BEFOREEND);
  render(filmListComponent, filmLContainerComponent, RenderPosition.BEFOREEND);
  render(filmBoardComponent, new FilmTopRatedView(), RenderPosition.BEFOREEND);
  render(filmBoardComponent, new FilmMostCommentedView(), RenderPosition.BEFOREEND);


  if (boardFilms.length === 0) {
    render(filmBoardComponent, new FilmListEmpty(), RenderPosition.AFTERBEGIN);
    return;
  }

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmLContainerComponent, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(filmListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmLContainerComponent, film));

        renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });
  }
}

renderBoard(siteMainElement, films)
