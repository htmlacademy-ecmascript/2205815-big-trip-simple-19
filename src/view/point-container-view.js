import {createElement} from '../render';

const createPointContainerTemplate = () =>
  `<ul class="trip-events__list">
</ul>`;

export class PointContainerView {
  #element = null;

  get template() {
    return createPointContainerTemplate();
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
