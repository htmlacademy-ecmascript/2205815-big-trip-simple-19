import {render} from '../render.js';
import {OfferContainerView} from '../view/offer-container-view.js';

export class OfferContainerPresenter {
  #renderContainer = null;

  constructor({renderContainer}) {
    this.#renderContainer = renderContainer;
  }

  init() {
    render (new OfferContainerView(), this.#renderContainer);
  }
}
