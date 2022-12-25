import {FilterView} from './view/filter-view.js';
import {render} from './render.js';
import {BoardPresenter} from './presenter/board-presenter.js';
import {PointModel} from './model/points-model.js';
import {EventEditFormPresenter} from './presenter/edit-form-presenter.js';
import {EventEditFormModel} from './model/edit-form-model.js';
import {OfferContainerPresenter} from './presenter/offer-container-presenter.js';
import {OfferContainerModel} from './model/offer-container-model.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const eventModel = new EventEditFormModel();
const offerContainerModel = new OfferContainerModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});
const eventEditFormPresenter = new EventEditFormPresenter({renderContainer: siteMainElement, editEventForm: eventModel});
const offerContainerPresenter = new OfferContainerPresenter({renderContainer: siteMainElement, offerListContainer: offerContainerModel});

render(new FilterView(), siteHeaderElement);

boardPresenter.init();
eventEditFormPresenter.init();
offerContainerPresenter.init();
