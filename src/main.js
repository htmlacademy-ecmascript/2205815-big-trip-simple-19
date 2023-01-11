import {FilterView} from './view/filter-view';
import {render} from './render';
import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {EditPointPresenter} from './presenter/edit-point-presenter';
import {SortView} from './view/sort-view';
import {DestinationModel} from './model/destination-model';
import {OfferModel} from './model/offer-model';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});
const eventEditFormPresenter = new EditPointPresenter({renderContainer: siteMainElement, editEventForm: pointModel, destinationModel, offerModel});


render(new FilterView(), siteHeaderElement);
render(new SortView(), siteMainElement);

boardPresenter.init();
eventEditFormPresenter.init();
