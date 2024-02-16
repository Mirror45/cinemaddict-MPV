import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import BoardPresenter from './presenter/board.js';
import { generateFilm } from "./mock/film.js";
import { generateFilter } from "./mock/filter.js";
import { render, RenderPosition } from "./utils/render.js";

const FILM_COUNT = 20;


const films = Array.from({ length: FILM_COUNT }, (_) => generateFilm());
const filters = generateFilter(films);

console.log(films);

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement);

boardPresenter.init(films);
