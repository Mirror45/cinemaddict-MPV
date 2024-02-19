import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import { generateFilm } from "./mock/film.js";
// import { generateFilter } from "./mock/filter.js";
import { render, RenderPosition } from "./utils/render.js";

const FILM_COUNT = 20;

const films = Array.from({ length: FILM_COUNT }, (_) => generateFilm());
// const filters = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new FilterView(filters, 'all'), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
boardPresenter.init();
