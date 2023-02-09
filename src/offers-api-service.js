import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateOffer(offer) {
    const response = await this._load({
      url: `offers/${offer.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(offer)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addOffer(offer) {
    const response = await this._load({
      url: 'offers',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(offer)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteOffer(offer) {
    const response = await this._load({
      url: `offers/${offer.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(offer) {
    const adaptedOffer = {...offer,
      'due_date': offer.dueDate instanceof Date ? offer.dueDate.toISOString() : null,
      //'date_to': point.dueDate instanceof Date ? point.dueDate.toISOString() : null,
      //'is_favorite': point.isFavorite,
      //'repeating_days': point.repeating,
    };

    // Ненужные ключи мы удаляем
    //delete adaptedPoint.dueDate;
    //delete adaptedPoint.isArchive;
    //delete adaptedPoint.isFavorite;
    //delete adaptedPoint.repeating;

    return adaptedOffer;
  }
}
