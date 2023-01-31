import {mockPoints} from '../mock/mock-points.js';

export class PointModel {
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

}
