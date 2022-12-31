import {POINT_OFFERS} from '../mock/mock-offer';

export class OfferModel {
  offers = POINT_OFFERS;

  getOfferById(type, id) {
    const offersBytype = [];
    offersBytype.push(this.offers.find((element) => element.type === type));

    const offersArr = [];

    for(let i = 0; i < id.length; i++) {
      offersArr.push(offersBytype.find((element) => element.id === id[i]));
    }
    return offersArr;
  }
}
