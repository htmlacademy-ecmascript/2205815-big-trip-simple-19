import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizePointDueDate, isSelectedOffer} from '../utils';
import {OFFERS_BY_TYPE} from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const newFormPoint = {
  'basePrice': '',
  'dateFrom': new Date(),
  'dateTo': new Date(),
  'destination': '',
  'id': '',
  'offers': [],
  'type': 'taxi',
};


function createDestinationTypeTemplate(destinationList) {
  return destinationList.map((element) => `<option value=${element}></option>
 `).join('');
}

function createOfferTemplate(offers, selectedOffers) {
  return offers.map(({id, title, price}) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" ${price} id=${id} type="checkbox" name="event-offer-luggage" ${isSelectedOffer(selectedOffers, id) ? 'checked' : ''}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join('');
}

export const createOfferContainerTemplate = (offers, selectedOffers) =>
  `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createOfferTemplate(offers, selectedOffers)}
          </section>`;

const createTypeEventTemplate = (offersType) =>
  offersType.map((element) =>
    `<div class="event__type-item">
      <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}">
      <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
      </div>`).join('');

const createDestinationTemplate = (destination) => {
  const {description: descriptionPoint, pictures: [{src, description: descriptionPhoto}]} = destination;
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

function createNewFormFormTemplate(point, allOffers, allDestination) {
  const {basePrice, dateFrom, dateTo, type, destination: destinationId, isDeleting, isSaving, offers: selectedOffers} = point;
  const humanizeDateFrom = humanizePointDueDate(dateFrom, 'DD/MM/YY-HH:mm');
  const humanizeDateTo = humanizePointDueDate(dateTo, 'DD/MM/YY-HH:mm');
  const offerByType = allOffers.find((pointOffer) => pointOffer.type === point.type)?.offers || [];
  const destination = allDestination.find((dest) => dest.id === destinationId);
  const destinationType = allDestination.map((dest) => dest.name);

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination?.name || ''}" list="destination-list-1" required>
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
        <label class="event__label" for="event-price-1" >
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-1" min="1" type="number"  name="event-price" value="${basePrice}" required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">${isDeleting ? 'Canceling...' : 'Cancel'}</button>
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    ${offerByType.length ? createOfferContainerTemplate(offerByType, selectedOffers) : ''}
    ${destination ? createDestinationContainerTemplate(destination) : ''}
  </form>`;
}

export default class NewPointView extends AbstractStatefulView {
  datepicker = null;
  handleFormSubmit = null;
  handleDeleteClick = null;


  constructor({onFormSubmit, onDeleteClick, offers, destinations}) {
    super();
    this.point = newFormPoint;
    this._setState(NewPointView.parsePointToState(this.point));
    this.handleFormSubmit = onFormSubmit;
    this.handleDeleteClick = onDeleteClick;
    this.offers = offers;
    this.destinations = destinations;
    this._restoreHandlers();
  }

  startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
      dateTo: userDate
    });
  };

  endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setStartDatepicker() {
    this.datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.startDateChangeHandler,
      },
    );
  }

  #setEndDatepicker() {
    this.datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.endDateChangeHandler,
        minDate: this._state.dateFrom,
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
      this.#changeOffersTypeHandlers(evt);
    });

    this.element.querySelector('.event__input--destination').addEventListener('change', (evt) => {
      this.#changeDestinationHandlers(evt);
    });

    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#onSubmitHandler();
    });

    this.element.querySelector('.event__reset-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#onDeleteClickHandler();
    });

    this.element.querySelector('.event__section--offers').addEventListener('click', (evt) => {
      this.#onOfferClickHandler(evt);
    });

    this.element.querySelector('#event-price-1').addEventListener('change', (evt) => {
      this.#onChangePriceHandler(evt);
    });

    this.element.querySelector('#event-start-time-1').addEventListener('change', (evt) => {
      this.#onChangeDateFromHandler(evt);
    });

    this.element.querySelector('#event-end-time-1').addEventListener('change', (evt) => {
      this.#onChangeDateToHandler(evt);
    });

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  #onChangeDateToHandler(evt) {
    this.updateElement({
      dateTo: evt.target.value
    });
  }

  #onChangeDateFromHandler(evt) {
    this.updateElement({
      dateFrom: evt.target.value
    });
  }

  #onChangePriceHandler(evt) {
    this.updateElement({
      basePrice: Math.round(evt.target.value)
    });

  }


  #onOfferClickHandler(evt) {
    const id = evt.target.id;
    const idNumber = Number(id);
    if (idNumber === 0) {
      return;
    }
    if (this._state.offers.includes(idNumber)) {
      const i = this._state.offers.indexOf(idNumber);
      this._state.offers.splice(i, 1);
    } else {
      this._state.offers.push(idNumber);
    }
  }

  get template() {
    return createNewFormFormTemplate(this._state, this.offers, this.destinations);
  }

  reset(point) {
    this.updateElement(
      NewPointView.parsePointToState(point),
    );
  }

  #onSubmitHandler = () => {
    this.handleFormSubmit(NewPointView.parseStateToPoint({...this._state}));
  };

  #onDeleteClickHandler = () => {
    this.handleDeleteClick(NewPointView.parseStateToPoint(this._state));
  };

  #changeOffersTypeHandlers(evt) {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });

  }

  #changeDestinationHandlers(evt) {
    if (evt.target.value) {
      evt.preventDefault();
      const newDestination = this.destinations.find((destination) => destination.name === evt.target.value);
      this.updateElement({
        destination: newDestination.id,
        offers: []
      });
    }
  }


  static parsePointToState(point) {
    return {...point};
  }


  static parseStateToPoint(state) {
    return {...state};

  }
}
