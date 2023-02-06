import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizePointDueDate} from '../utils';
import {POINT_OFFERS} from '../mock/mock-offer';
import {POINT_DESTINATION} from '../mock/mock-destination';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const OFFERS_BY_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destinationType = ['Praga', 'St.Peterburg', 'Portu', 'London', 'Osaka', 'Rim', 'Barselona', 'Tokyo'];

const createDestinationTypeTemplate = (destinationList) =>
  destinationList.map((element) =>
    `<option value=${element}></option>
 `).join('');

const createOfferTemplate = (offers) =>

  offers.map(({id, title, price}) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name="event-offer-luggage">
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join('');

export const createOfferContainerTemplate = (offers) =>
  `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createOfferTemplate(offers)}
          </section>`;

const createTypeEventTemplate = (offersType) =>
  offersType.map((element) =>
    `<div class="event__type-item">
      <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}">
      <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
      </div>`).join('');

const createDestinationTemplate = (destination) => {
  const {description: descriptionPoint, pictures:[{src, description: descriptionPhoto}]} = destination;

  return `<p class="event__destination-description">${descriptionPoint}</p>
      
        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src=${src} alt=${descriptionPhoto}>
          </div>
        </div>`;
};

const createDestinationContainerTemplate = (destinations) =>
  `<section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  ${createDestinationTemplate(destinations)}
                </section>`;

function createEventEditFormTemplate(point) {
  const {base_price: basePrice, date_from: dateFrom, date_to: dateTo, type, offers, destination} = point;
  const humanizeDateFrom = humanizePointDueDate(dateFrom, 'DD/MM/YY-HH:mm');
  const humanizeDateTo = humanizePointDueDate(dateTo, 'DD/MM/YY-HH:mm');
  const destinationName = destination.name;

  return `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createTypeEventTemplate(OFFERS_BY_TYPE)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type} to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destinationName} list="destination-list-1">
        <datalist id="destination-list-1">
        ${createDestinationTypeTemplate(destinationType)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizeDateFrom}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizeDateTo}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    ${createOfferContainerTemplate(offers)}
    ${createDestinationContainerTemplate(destination)}
    </form>`;
}

export default class EditPointView extends AbstractStatefulView {
  onCloseBtnClick = null;
  datepicker = null;
  onSubmitForm = null;


  constructor({point, onCloseBtnClick, onSubmitForm, handleDeleteClick, offers, destination}) {
    super();
    this.offers = offers;
    this.destination = destination;
    this._setState(EditPointView.parsePointToState(point, this.offers, this.destination));
    this.handleCloseBtnClick = onCloseBtnClick;
    this._restoreHandlers();
    this.onSubmitForm = onSubmitForm;
    this.handleDeleteClick = handleDeleteClick;
    this.newOffers = [];
    this.b = {...point, offers: offers, destination: destination};
    console.log(this.b)
  }

  startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      date_from: userDate,
      date_to: userDate
    });
  };

  endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      date_to: userDate,
    });
  };

  setStartDatepicker() {
    this.datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.date_from,
        onChange: this.startDateChangeHandler,
      },
    );
  }

  setEndDatepicker() {
    this.datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.date_to,
        onChange: this.endDateChangeHandler,
        minDate: this._state.date_from,
      },
    );
  }

  removeElement() {
    super.removeElement();

    if (this.datepicker) {
      this.datepicker.destroy();
      this.datepicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', (evt) => {
      this.changeOffersTypeHandlers(evt);
    });
    this.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      console.log(this.b)
      this.reset(this.b);
      evt.preventDefault();
      this.closeBtnClickHandler();
    });

    this.element.querySelector('.event__input--destination').addEventListener('change', (evt) => {
      this.changeDestinationHandlers(evt);
    });

    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.onSubmitHandler();
    });

    this.element.querySelector('.event__reset-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.onDeleteClickHandler();
    });


    this.element.querySelector('.event__section--offers').addEventListener('click', (evt) => {
      const id = evt.target.id;
      const idNumber = Number(id);

      if(idNumber === 0) {
        return;
      }
      if (this.newOffers.includes(idNumber)){
        const i = this.newOffers.indexOf(idNumber);
        this.newOffers.splice(i, 1);

      } else {
        this.newOffers.push(idNumber);

      }}

    );
    //console.log(this.newOffers);
    this.setStartDatepicker();
    this.setEndDatepicker();
  }


  get template() {
    return createEventEditFormTemplate(this._state);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  onSubmitHandler = () => {
    this.onSubmitForm(EditPointView.parseStateToPoint({...this._state, offers: this.newOffers, destination: this._state.destination.id}));
  };

  onDeleteClickHandler = () => {
    this.handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  closeBtnClickHandler = () => {
    this.handleCloseBtnClick();
  };

  changeOffersTypeHandlers(evt) {
    evt.preventDefault();
    const newOffers = POINT_OFFERS.filter((pointOffers) => evt.target.value.includes(pointOffers.type));
    this.updateElement({
      offers: newOffers[0].offers,
      type: evt.target.value
    });

  }

  changeDestinationHandlers(evt) {
    evt.preventDefault();
    const newDestination = POINT_DESTINATION.filter((pointOffers) => evt.target.value.includes(pointOffers.name));
    this.updateElement({
      destination: newDestination[0]
    });
  }


  static parsePointToState(point, offers, destination) {
    return {...point, offers: offers, destination: destination};
  }


  static parseStateToPoint(state) {
    return {...state};

  }
}
