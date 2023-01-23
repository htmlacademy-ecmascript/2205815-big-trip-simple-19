import AbstractView from '../framework/view/abstract-view.js';

const createPointContainerTemplate = () =>
  `<ul class="trip-events__list">
</ul>`;

export default class PointContainerView extends AbstractView {

  get template() {
    return createPointContainerTemplate();
  }
}
