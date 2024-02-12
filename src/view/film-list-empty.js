import AbstractView from './abstract.js';

const createFilmListEmptyTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class FilmListEmpty extends AbstractView {
  getTemplate() {
    return createFilmListEmptyTemplate();
  }
}
