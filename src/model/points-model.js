import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export class PointModel extends Observable {
  #points = [];
  pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const points = await this.pointsApiService.points;
      this.#points = points.map(this.adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  getPoint() {
    const dateFrom = 'date_from';
    this.#points.sort((a, b) => a[dateFrom] > b[dateFrom] ? 1 : -1);
    return this.#points;
  }

  getPointByPrice() {
    const basePrice = 'base_price';
    this.#points.sort((a, b) => a[basePrice] < b[basePrice] ? 1 : -1);
    return this.#points;
  }

  updatePoint(updateType, update) {

    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {

    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  adaptToClient(point) {
    const adaptedPoint = {...point,
      dueDate: point['due_date'] !== null ? new Date(point['due_date']) : point['due_date'], // На клиенте дата хранится как экземпляр Date
      //isArchive: point['is_archived'],
      //isFavorite: point['is_favorite'],
      //repeating: point['repeating_days'],
    };

    // Ненужные ключи мы удаляем
    //delete adaptedTask['due_date'];
    //delete adaptedTask['is_archived'];
    //delete adaptedTask['is_favorite'];
    //delete adaptedTask['repeating_days'];

    return adaptedPoint;
  }
}
