import {render} from './framework/render.js';
import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {DestinationModel} from './model/destination-model';
import {OfferModel} from './model/offer-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonView from './view/new-point-button';
import PointsApiService from './points-api-service.js';
import OffersApiService from './destinations-api-service';
import DestinationsApiService from './destinations-api-service';


const AUTHORIZATION = 'Basic hS2sfS44wcl152f5';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple/';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});
const destinationModel = new DestinationModel({destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)});
const offerModel = new OfferModel({offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel, offerModel, destinationModel, filterModel, onNewPointDestroy: handleNewPointFormClose});
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
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


console.log(offerModel.init());
filterPresenter.init();
boardPresenter.init();
pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteHeaderElement);
  });
offerModel.init();
destinationModel.init();

