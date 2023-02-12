import AbstractView from '../framework/view/abstract-view.js';

function createNoFuturePointTemplate() {
  return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <p class="trip-events__msg">There are no future events now</p>

  </section>`;
}

export default class NoFuturePoint extends AbstractView {

  get template() {
    return createNoFuturePointTemplate();
  }
}
