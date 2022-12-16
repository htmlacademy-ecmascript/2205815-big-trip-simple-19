import {FilterView} from './filter-view.js';
import {render} from './render.js';
import {BoardPresenter} from './board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});

render(new FilterView(), siteHeaderElement);

boardPresenter.init();
