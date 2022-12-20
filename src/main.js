import {FilterView} from './view/filter-view.js';
import {render} from './render.js';
import {BoardPresenter} from './presenter/board-presenter.js';
import {getRandomPoint} from './mock/mockPoints.js';
import {PointModel} from './model/points-model.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});

render(new FilterView(), siteHeaderElement);

boardPresenter.init();

console.log(getRandomPoint());

