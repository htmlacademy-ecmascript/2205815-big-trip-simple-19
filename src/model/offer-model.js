import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export class OfferModel extends Observable {
  #offers = [];
  offersApiService = null;

  constructor({offersApiService}) {
    super();
    this.offersApiService = offersApiService;
  }

  async init() {
    try {
      const offers = await this.offersApiService.offers;
      this.#offers = offers.map(this.#adaptToClient);
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }

  #adaptToClient(offer) {
    const adaptedOffer = {...offer,
    };
    return adaptedOffer;
  }
}
