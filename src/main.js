import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import { render, RenderPosition } from "./utils/render.js";
import {UpdateType} from './const.js';
import Api from './api.js';


const AUTHORIZATION = 'Basic hS2Fd3dWWcl41sa2j';
const END_POINT = 'https://19.ecmascript.htmlacademy.pro/cinemaddict';

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
boardPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
