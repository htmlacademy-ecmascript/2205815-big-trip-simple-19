import {mockPoints} from '../mock/mock-points';

export class EditPointView {
  point = mockPoints[0];

  getPoint() {
    return this.point;
  }
}
