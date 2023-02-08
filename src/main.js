import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {DestinationModel} from './model/destination-model';
import {OfferModel} from './model/offer-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel, offerModel, destinationModel, filterModel});
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel,
  pointModel
});


//render(new FilterView(), siteHeaderElement);
filterPresenter.init();
boardPresenter.init();
