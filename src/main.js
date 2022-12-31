import {FilterView} from './view/filter-view';
import {render} from './render';
import {BoardPresenter} from './presenter/board-presenter';
import {PointModel} from './model/points-model';
import {EditPointPresenter} from './presenter/edit-point-presenter';
import {SortView} from './view/sort-view';
import {DestinationModel} from './model/destination-model';
import {OfferModel} from './model/offer-model';
import {POINT_OFFERS} from './mock/mock-offer';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const offerModel = new OfferModel();
const boardPresenter = new BoardPresenter({renderContainer: siteMainElement, pointModel});
const eventEditFormPresenter = new EditPointPresenter({renderContainer: siteMainElement, editEventForm: pointModel, destinationModel});


render(new FilterView(), siteHeaderElement);
render(new SortView(), siteMainElement);

boardPresenter.init();
eventEditFormPresenter.init();


const getOfferById = (type, id) => {
  const offers = POINT_OFFERS;
  const offersBytype = [];
  offersBytype.push(offers.find((element) => element.type === type));
  console.log(offersBytype);
  const offersArr = [];

  console.log(offersBytype[0].offers[id]);

  //for(let i = 0; i < id.length; i++) {
  //console.log(offersArr.push(offersBytype.find((element) => element.offers.id === id[i])));
  //}
  //return offersArr;
};
console.log(getOfferById('taxi', [1,2,3,4]));
