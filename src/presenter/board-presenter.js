import {render} from '../render.js';
import {PointListView} from '../view/point-view.js';

export class BoardPresenter {
  renderContainer = null;

  constructor({renderContainer, pointModel,}) {
    this.renderContainer = renderContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getPoint()];

    for ( let i = 0; i < this.boardPoints.length; i++) {
      render(new PointListView({point: this.boardPoints[i]}), this.renderContainer);
    }
  }
}
