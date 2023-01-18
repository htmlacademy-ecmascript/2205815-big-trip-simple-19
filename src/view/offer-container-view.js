import {createElement} from '../render.js';

export function createOfferContainerTemplate() {
  return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          </section>`;
}

export class OfferContainerView {
  #element = null;

  get template() {
    return createOfferContainerTemplate;
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
