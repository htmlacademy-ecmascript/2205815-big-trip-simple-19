import {createElement} from '../render';
import {humanizePointDueDate} from '../utils';
import {createOfferContainerTemplate} from '../view/offer-view';
import {createDestinationContainerTemplate} from '../view/destination-view';

const OFFERS_BY_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const createTypeEventTemplate = (offersType) =>
  offersType.map((element) =>
    `<div class="event__type-item">
      <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}">
      <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
      </div>`).join('');

function createEventEditFormTemplate(editEventForm) {
  const {type, base_price: basePrice, date_from: dateFrom, date_to: dateTo, offers, offer_price: offerPrice} = editEventForm;
  const humanizeDateFrom = humanizePointDueDate(dateFrom, 'DD/MM/YY HH:mm');
  const humanizeDateTo = humanizePointDueDate(dateTo, 'DD/MM/YY HH:mm');
  const humanizeStartEventDate = humanizePointDueDate(dateFrom, 'MMM DD');

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizeDateFrom}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dateTo}>
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
    ${createOfferContainerTemplate()}
    ${createDestinationContainerTemplate()}
  </form>`;
}

export class EventEditFormView {
  constructor({editEventForm}) {
    this.editEventForm = editEventForm;
  }

  getTemplate() {
    return createEventEditFormTemplate(this.editEventForm);
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

