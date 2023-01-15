import {createElement} from '../render.js';

function createLoadingTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export class LoadingView {
  #element = null;

  get template() {
    return createLoadingTemplate;
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeelement() {
    this.#element = null;
  }
}
