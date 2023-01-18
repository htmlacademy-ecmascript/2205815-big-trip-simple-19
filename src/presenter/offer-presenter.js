/*
import {render} from '../render.js';
import {OfferView} from '../view/offer-view';

export class OfferPresenter {
  renderContainer = null;

  constructor({renderContainer, offerModel}) {
    this.renderContainer = renderContainer;
    this.offerModel = offerModel;
  }

  init() {
    this.offer = [...this.offerModel.getOffer()];

    for ( let i = 0; i < this.offer.length; i++) {
      render(new OfferView({offer: this.offer[i]}), this.renderContainer);
    }
  }
}
*/
