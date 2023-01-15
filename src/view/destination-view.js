import {createElement} from '../render';

const createDestinationTemplate = ({destination}) => {
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

export class DestinationView {
  #element = null;

  constructor(destinations){
    this.destinations = destinations;
  }

  get template() {
    return createDestinationContainerTemplate(this.destinations);
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
