import {render} from '../render.js';
import {SortView} from '../view/sort-view.js';
import {EventView} from '../view/event-form-view.js';
import {EventWithoutDestinationView} from '../view/event-form-view.js';
import {EventWithoutOfferView} from '../view/event-form-view.js';
import {EditFormView} from '../view/edit-form-view.js';
import {EmptyListView} from '../view/empty-list-view.js';
import {PointListView} from '../view/point-view.js';
import {LoadingView} from '../view/loading-view.js';


export class BoardPresenter {
  renderContainer = null;

  constructor({renderContainer, pointModel}) {
    this.renderContainer = renderContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getPoint()];

    render(new SortView(), this.renderContainer);
    render(new EventView(), this.renderContainer);
    render(new EventWithoutDestinationView(), this.renderContainer);
    render(new EventWithoutOfferView(), this.renderContainer);
    render(new EditFormView(), this.renderContainer);
    render(new EmptyListView(), this.renderContainer);
    render(new LoadingView(), this.renderContainer);

    for ( let i = 0; i < this.boardPoints.length; i++) {
      render(new PointListView({popint: this.boardPoints[i]}), this.renderContainer);
    }
  }
}
