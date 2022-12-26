import {FilterView} from './view/filter-view';
import {render} from './render';
import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {EventEditFormPresenter} from './presenter/edit-form-presenter';
import {EventEditFormModel} from './model/edit-form-model';


const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const eventModel = new EventEditFormModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});
const eventEditFormPresenter = new EventEditFormPresenter({renderContainer: siteMainElement, editEventForm: eventModel});


render(new FilterView(), siteHeaderElement);

boardPresenter.init();
eventEditFormPresenter.init();

