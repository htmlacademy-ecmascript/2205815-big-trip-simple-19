import {FilterView} from './view/filter-view.js';
import {render} from './render.js';
import {BoardPresenter} from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter(siteMainElement);

render(new FilterView(), siteHeaderElement);

boardPresenter.init();
