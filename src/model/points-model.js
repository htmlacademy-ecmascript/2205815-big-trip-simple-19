import {mockPoints} from '../mock/mock-points.js';

export class PointModel {
  #points = mockPoints;

  getPoint() {
    return this.#points;
  }
}

