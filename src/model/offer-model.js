import {POINT_OFFERS} from '../mock/mock-offer';

export class OfferModel {

  availableType = POINT_OFFERS;

  getOfferById(id) {
    const {type, offers} = id;
    const offersById = [];
    const elementByType = this.availableType.find((element) => element.type === type);
    const allElementOffers = elementByType.offers;

    for(let i = 0; i < offers.length; i++) {
      offersById.push(allElementOffers.find((element) => element.id === offers[i]));
    }
    return offersById;
  }

}
