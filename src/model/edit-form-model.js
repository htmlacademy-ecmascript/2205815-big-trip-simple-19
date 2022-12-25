import {getRandomPoint} from '../mock/mock-points.js';

const POINT_COUNT = 3;

export class EventEditFormModel {
  events = Array.from({length: POINT_COUNT}, getRandomPoint);

  getEvent() {
    return this.events;
  }
}
