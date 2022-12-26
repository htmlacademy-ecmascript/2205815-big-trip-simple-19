import {POINT_DESTINATION} from '../mock/mock-destination';

const createDestinationTemplate = (destinations) =>
  destinations.map(({description: descriptionPoint, pictures:[{src, description: descriptionPhoto}]}) =>

    `<p class="event__destination-description">${descriptionPoint}</p>

  <div class="event__photos-container">
    <div class="event__photos-tape">
      <img class="event__photo" src=${src} alt=${descriptionPhoto}>
    </div>
  </div>`).join('');


export function createDestinationContainerTemplate() {
  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${createDestinationTemplate(POINT_DESTINATION)}
          </section>`;
}
