import {createElement} from './render.js';

function createLoadingTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export class LoadingView {
  getTemplate() {
    return createLoadingTemplate;
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeelement() {
    this.element = null;
  }
}
