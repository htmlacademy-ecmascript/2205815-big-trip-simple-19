import {getRandomPoint} from '../mock/mockPoints.js';

const POINT_COUNT = 3;

export class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoint() {
    return this.points;
  }
}
