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
      this.#destinations = destinations.map(this.adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  adaptToClient(destination) {
    const adaptedDestination = {...destination,
      //dueDate: destination['due_date'] !== null ? new Date(destination['due_date']) : destination['due_date'], // На клиенте дата хранится как экземпляр Date
      //isArchive: point['is_archived'],
      //isFavorite: point['is_favorite'],
      //repeating: point['repeating_days'],
    };

    // Ненужные ключи мы удаляем
    //delete adaptedTask['due_date'];
    //delete adaptedTask['is_archived'];
    //delete adaptedTask['is_favorite'];
    //delete adaptedTask['repeating_days'];

    return adaptedDestination;
  }

}

















/*
getDestinationById(id) {
  return this.#destinations.find((element) => element.id === id);
}
*/
