import { render, RenderPosition } from "./utils.js";
import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmBoardView from "./view/film-board.js";
import FilmListView from "./view/film-list.js";
import FilmContainerView from "./view/film-container.js";
import FilmView from "./view/film.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmTopRatedView from "./view/film-top-rated.js";
import FilmMostCommentedView from "./view/film-most-commented.js";
import { generateFilm } from "./mock/film.js";
import { generateFilter } from "./mock/filter.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({ length: FILM_COUNT }, (_) => generateFilm());
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const filmBoardComponent = new FilmBoardView();
const filmListComponent = new FilmListView();
const filmLContainerComponent = new FilmContainerView();

render(siteMainElement, filmBoardComponent.getElement(), RenderPosition.BEFOREEND);
render(filmBoardComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);
render(filmListComponent.getElement(), filmLContainerComponent.getElement(), RenderPosition.BEFOREEND);
render(filmBoardComponent.getElement(), new FilmTopRatedView().getElement(), RenderPosition.BEFOREEND);
render(filmBoardComponent.getElement(), new FilmMostCommentedView().getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmLContainerComponent.getElement(), new FilmView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmLContainerComponent.getElement(), new FilmView(film).getElement(), RenderPosition.BEFOREEND));

      renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}
