import AbstractView from './abstract.js';

const createFilmContainerTemplate = () => {
  return `<div class="films-list__container"></section>`;
};


export default class FilmContainer extends AbstractView {
  getTemplate() {
    return createFilmContainerTemplate();
  }
}
