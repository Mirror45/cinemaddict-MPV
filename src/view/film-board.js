import AbstractView from './abstract.js';

const createFilmBoardTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmBoard extends AbstractView {
  getTemplate() {
    return createFilmBoardTemplate();
  }
}

