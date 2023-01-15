import {mockPoints} from '../mock/mock-points.js';
import {OFFERS} from '../mock/mock-offer';

export class PointModel {
  #points = mockPoints[0];
  #offers = OFFERS;

  getPoint() {
    const offerIds = this.#points.offers;
    const pointWithId = this.#offers.filter((offer) => offerIds.includes(offer.id));
    this.#points.offers = pointWithId;
    return this.#points;
  }

}
