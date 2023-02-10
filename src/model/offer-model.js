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
      this.#offers = offers.map(this.adaptToClient);
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }

  adaptToClient(offer) {
    const adaptedOffer = {...offer,
      //dueDate: offer['due_date'] !== null ? new Date(offer['due_date']) : offer['due_date'], // На клиенте дата хранится как экземпляр Date
      //isArchive: point['is_archived'],
      //isFavorite: point['is_favorite'],
      //repeating: point['repeating_days'],
    };

    // Ненужные ключи мы удаляем
    //delete adaptedTask['due_date'];
    //delete adaptedTask['is_archived'];
    //delete adaptedTask['is_favorite'];
    //delete adaptedTask['repeating_days'];

    return adaptedOffer;
  }
}

//const ff = new OfferModel();
//console.log(ff);



/*  getOfferById(offersIds) {
    return this.#offers.filter((offer) => offersIds.includes(offer.id));
  }
*/
