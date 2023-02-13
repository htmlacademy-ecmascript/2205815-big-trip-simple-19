import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';


export class DestinationModel extends Observable {
  #destinations = [];
  #destinationsApiService = null;

  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;

  }
}
