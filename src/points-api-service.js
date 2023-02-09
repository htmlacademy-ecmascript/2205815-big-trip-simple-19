import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'date_from': point.dueDate instanceof Date ? point.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
      'date_to': point.dueDate instanceof Date ? point.dueDate.toISOString() : null,
      //'is_favorite': point.isFavorite,
      //'repeating_days': point.repeating,
    };

    // Ненужные ключи мы удаляем
    //delete adaptedPoint.dueDate;
    //delete adaptedPoint.isArchive;
    //delete adaptedPoint.isFavorite;
    //delete adaptedPoint.repeating;

    return adaptedPoint;
  }
}
