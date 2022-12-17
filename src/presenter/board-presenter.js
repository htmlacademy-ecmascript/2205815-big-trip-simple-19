import {render} from '../render.js';
import {SortView} from '../view/sort-view.js';
import {EventView} from '../view/event-form-view.js';
import {EventWithoutDestinationView} from '../view/event-form-view.js';
import {EventWithoutOfferView} from '../view/event-form-view.js';
import {EditFormView} from '../view/edit-form-view.js';
import {EmptyListView} from '../view/empty-list-view.js';
import {PointView} from '../view/point-list-view.js';
import {LoadingView} from '../view/loading-view.js';


export class BoardPresenter {
  renderContainer = null;

  constructor(renderContainer) {
    this.renderContainer = renderContainer;
  }

  init() {
    render(new SortView(), this.renderContainer);
    render(new EventView(), this.renderContainer);
    render(new EventWithoutDestinationView(), this.renderContainer);
    render(new EventWithoutOfferView(), this.renderContainer);
    render(new EditFormView(), this.renderContainer);
    render(new EmptyListView(), this.renderContainer);
    render(new LoadingView(), this.renderContainer);

    for ( let i = 0; i < 3; i++) {
      render(new PointView(), this.renderContainer);
    }
  }
}
