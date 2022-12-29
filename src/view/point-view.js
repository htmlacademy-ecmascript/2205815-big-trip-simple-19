import {createElement} from '../render.js';
import {humanizePointDueDate} from '../utils.js';


const getOfferTemplate = (offers) => offers.map((element) => `<li class="event__offer">
<span class="event__offer-title">${element}</span>
&plus;&euro;&nbsp;
<span class="event__offer-price">10</span>
</li>`).join('');

function createPointTemplate(point) {
  const {type, base_price: basePrice, date_from: dateFrom, date_to: dateTo, destination, offers} = point;
  const humanizeDateFrom = humanizePointDueDate(dateFrom, 'HH:mm');
  const humanizeDateTo = humanizePointDueDate(dateTo, 'HH:mm');
  const humanizeStartEventDate = humanizePointDueDate(dateFrom, 'MMM DD');

  return `<ul class="trip-events__list">
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${humanizeStartEventDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">Check-in ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${humanizeDateFrom}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${humanizeDateTo}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${getOfferTemplate(offers)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
  </ul>`;
}


export class PointView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
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
