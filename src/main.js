import { render } from "./util.js";
import { createUserProfileTemplate } from "./view/user-profile.js";
import { createFilterTemplate } from "./view/filter.js";
import { createSortTemplate } from "./view/sort.js";
import { createFilmBoardTemplate } from "./view/film-board.js";
import { createFilmListTemplate } from "./view/film-list.js";
import { createFilmContainerTemplate } from "./view/film-container.js";
import { createFilmTemplate } from "./view/film.js";
import { createShowMoreButtonTemplate } from "./view/show-more-button.js";
import { createFilmTopRatedTemplate } from "./view/film-top-rated.js";
import { createFilmMostCommentedTemplate } from "./view/film-most-commented.js";
import { generateFilm } from "./mock/film.js";
import { generateFilter } from "./mock/filter.js";

const FILM_COUNT = 5;

const films = Array.from({ length: 5 }, (_) => generateFilm());
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, createUserProfileTemplate(), "beforeend");
render(siteMainElement, createFilterTemplate(filters), "beforeend");
render(siteMainElement, createSortTemplate(), "beforeend");
render(siteMainElement, createFilmBoardTemplate(), "beforeend");

const filmBoardElement = document.querySelector(".films");

render(filmBoardElement, createFilmListTemplate(), "beforeend");
render(filmBoardElement, createFilmTopRatedTemplate(), "beforeend");
render(filmBoardElement, createFilmMostCommentedTemplate(), "beforeend");

const filmListElement = document.querySelector(".films-list");

render(filmListElement, createFilmContainerTemplate(), "beforeend");
render(filmListElement, createShowMoreButtonTemplate(), "beforeend");

const filmContainerElement = document.querySelector(".films-list__container");

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmContainerElement, createFilmTemplate(films[i]), "beforeend");
  console.log(films[i]);
}
