import {render} from './render.js';
import {SortView} from './sort-view.js';
import {EventView} from './event-form-view.js';
import {EventWithoutDestinationView} from './event-form-view.js';
import {EventWithoutOfferView} from './event-form-view.js';
import {EditFormView} from './edit-form-view.js';
import {EmptyListView} from './empty-list-view.js';
import {PointView} from './point-list-view.js';
import {LoadingView} from './loading-view.js';

const siteMainElement = document.querySelector('.trip-events');

export class BoardPresenter {

  init() {
    render(new SortView(), siteMainElement);
    render(new EventView(), siteMainElement);
    render(new EventWithoutDestinationView(), siteMainElement);
    render(new EventWithoutOfferView(), siteMainElement);
    render(new EditFormView(), siteMainElement);
    render(new EmptyListView(), siteMainElement);
    render(new LoadingView(), siteMainElement);

    for ( let i = 0; i < 3; i++) {
      render(new PointView(), siteMainElement);
    }
  }
}
