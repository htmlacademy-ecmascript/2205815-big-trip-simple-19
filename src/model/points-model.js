import {mockPoints} from '../mock/mock-points.js';

export class PointModel {
  points = mockPoints[0];

  getPoint() {
    return this.points;
  }
}
