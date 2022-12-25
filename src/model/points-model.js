import {getRandomPoint} from '../mock/mock-points.js';

const POINT_COUNT = 3;

export class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoint() {
    return this.points;
  }
}
