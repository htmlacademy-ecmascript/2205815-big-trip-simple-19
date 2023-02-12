import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';


export class DestinationModel extends Observable {
  #destinations = [];
  destinationsApiService = null;

  constructor({destinationsApiService}) {
    super();
    this.destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      const destinations = await this.destinationsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;

  }

  #adaptToClient(destination) {
    const adaptedDestination = {...destination,
    };

    return adaptedDestination;
  }
}
