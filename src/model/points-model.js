import {mockPoints} from '../mock/mock-points.js';
import Observable from '../framework/observable.js';

export class PointModel extends Observable {
  #points = mockPoints;

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
      throw new Error('Can\'t update unexisting task');
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
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
