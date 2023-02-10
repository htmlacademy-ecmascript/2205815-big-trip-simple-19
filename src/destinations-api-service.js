import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async updateDestination(destination) {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(destination)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addDestination(destination) {
    const response = await this._load({
      url: 'destinations',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(destination)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteDestination(destination) {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(destination) {
    const adaptedDestination = {...destination,
      //'due_date': destination.dueDate instanceof Date ? destination.dueDate.toISOString() : null,
      //'date_to': point.dueDate instanceof Date ? point.dueDate.toISOString() : null,
      //'is_favorite': point.isFavorite,
      //'repeating_days': point.repeating,
    };

    // Ненужные ключи мы удаляем
    //delete adaptedPoint.dueDate;
    //delete adaptedPoint.isArchive;
    //delete adaptedPoint.isFavorite;
    //delete adaptedPoint.repeating;

    return adaptedDestination;
  }
}
