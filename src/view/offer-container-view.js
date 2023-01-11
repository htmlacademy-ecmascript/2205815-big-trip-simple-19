import {createElement} from '../render.js';

export function createOfferContainerTemplate() {
  return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          </section>`;
}

export class OfferContainerView {

  getTemplate() {
    return createOfferContainerTemplate;
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
