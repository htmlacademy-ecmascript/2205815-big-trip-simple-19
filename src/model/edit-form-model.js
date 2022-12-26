import {getRandomPoint} from '../mock/mock-points.js';

const POINT_COUNT = 1;

export class EventEditFormModel {
  events = Array.from({length: POINT_COUNT}, getRandomPoint);

  getEvent() {
    return this.events;
  }
}
const ff = new EventEditFormModel();
console.log(ff)