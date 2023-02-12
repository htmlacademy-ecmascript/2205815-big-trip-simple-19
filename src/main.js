import {render} from './framework/render.js';
import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {DestinationModel} from './model/destination-model';
import {OfferModel} from './model/offer-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonView from './view/new-point-button';
import PointsApiService from './API/points-api-service.js';
import OffersApiService from './API/offers-api-service.js';
import DestinationsApiService from './API/destinations-api-service.js';


const AUTHORIZATION = 'Basic hS2sfS44wcl152f7';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple/';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const siteMainElement = document.querySelector('.trip-main');
const pointModel = new PointModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});
const destinationModel = new DestinationModel({destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)});
const offerModel = new OfferModel({offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({renderContainer: siteEventsElement, pointModel, offerModel, destinationModel, filterModel, onNewPointDestroy: handleNewPointFormClose});
const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}


filterPresenter.init();
boardPresenter.init();

Promise.all([offerModel.init(), destinationModel.init()])
  .then(() => pointModel.init())
  .finally(() => {
    render(newPointButtonComponent, siteMainElement);
  });
