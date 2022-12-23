import {FilterView} from './view/filter-view.js';
import {render} from './render.js';
import {BoardPresenter} from './presenter/board-presenter.js';
import {PointModel} from './model/points-model.js';
import {EventEditFormPresenter} from './presenter/edit-form-presenter.js';
import {EventEditFormModel} from './model/edit-form-model.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const eventModel = new EventEditFormModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});
const eventEditFormPresenter = new EventEditFormPresenter({renderContainer: siteMainElement, eventModel});

render(new FilterView(), siteHeaderElement);

boardPresenter.init();
eventEditFormPresenter.init();
