import {render} from '../render.js';
import {OfferContainerView} from '../view/offer-container-view.js';

export class OfferContainerPresenter {
  renderContainer = null;

  constructor({renderContainer, offerListContainer}) {
    this.renderContainer = renderContainer;
    this.editEventForm = offerListContainer;
  }

  init() {
    render (new OfferContainerView(), this.renderContainer);
  }
}
