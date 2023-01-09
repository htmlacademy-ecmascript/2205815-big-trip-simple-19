import {OFFERS} from '../mock/mock-offer';

export class OfferModel {

  offers = OFFERS;

  getOfferById(offersIds) {
    return this.offers.filter((offer) => offersIds.includes(offer.id));
  }

}
