import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export class OfferModel extends Observable {
  #offers = [];
  #offersApiService = null;

  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }

}
