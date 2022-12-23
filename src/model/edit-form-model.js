import {getRandomPoint} from '../mock/mockPoints.js';

const POINT_COUNT = 3;

export class EventEditFormModel {
  events = Array.from({length: POINT_COUNT}, getRandomPoint);

  getEvent() {
    return this.events;
  }
}
