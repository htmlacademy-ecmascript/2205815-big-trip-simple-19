import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDueDate} from '../utils.js';


function getOfferTemplate(offers) {
  return offers.map(({title, price}) => `<li class="event__offer">
<span class="event__offer-title">${title}</span>
&plus;&euro;&nbsp;
<span class="event__offer-price">${price}</span>
</li>`).join('');
}

function createPointTemplate(point, offers, destinations) {
  //console.log(destinations);
  const {type, base_price: basePrice, date_from: dateFrom, date_to: dateTo, destination} = point;
  const humanizeDateFrom = humanizePointDueDate(dateFrom, 'HH:mm');
  const humanizeDateTo = humanizePointDueDate(dateTo, 'HH:mm');
  const humanizeStartEventDate = humanizePointDueDate(dateFrom, 'MMM DD');
  const offerByType = offers.find((pointOffer) => pointOffer.type === point.type)?.offers || [];
  const destinationDate = destinations.find((dest) => dest.id === destination) || [];
  //console.log(destinationDate);


  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${humanizeStartEventDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} to ${destinationDate.name}</h3>
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
    ${getOfferTemplate(offerByType)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
  `;
}


export default class PointView extends AbstractView {
  point = null;
  onEditFormClick = null;
  offers = null;
  destination = null;


  constructor({point, onEditFormClick, offers, destination}) {
    super();
    this.handleEditFormClick = onEditFormClick;
    this.offers = offers;
    this.destination = destination;
    this.point = {...point};


    this.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.editFormClickHandler();
    });
  }

  get template() {
    return createPointTemplate(this.point, this.offers, this.destination );
  }

  editFormClickHandler = () => {
    this.handleEditFormClick();
  };

}
