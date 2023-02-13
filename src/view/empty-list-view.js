import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = () =>
  `<section class="trip-events">
    <p class="trip-events__msg">Click New Event to create your first point</p>
  </section>`;


export default class EmptyListView extends AbstractView {

  get template() {
    return createEmptyListTemplate();
  }
}
