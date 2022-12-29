import {FilterView} from './view/filter-view';
import {render} from './render';
import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {EditPointPresenter} from './presenter/edit-point-presenter';
import {EditPointView} from './model/edit-form-model';
import {SortView} from './view/sort-view';


const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const eventModel = new EditPointView();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});
const eventEditFormPresenter = new EditPointPresenter({renderContainer: siteMainElement, editEventForm: eventModel});


render(new FilterView(), siteHeaderElement);
render(new SortView(), siteMainElement);

boardPresenter.init();
eventEditFormPresenter.init();

