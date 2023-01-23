import AbstractView from '../framework/view/abstract-view.js';

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

export default class DestinationView extends AbstractView {

  destinations = null;

  constructor(destinations) {
    super();
    this.destinations = destinations;
  }

  get template() {
    return createDestinationContainerTemplate(this.destinations);
  }
}
