import {render} from '../render.js';
import {PointView} from '../view/point-view.js';

export class BoardPresenter {
  renderContainer = null;

  constructor({renderContainer, pointModel}) {
    this.renderContainer = renderContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = this.pointModel.getPoint();
    render(new PointView({point: this.boardPoints}), this.renderContainer);
  }
}
