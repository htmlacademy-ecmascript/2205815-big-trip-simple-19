import AbstractView from '../framework/view/abstract-view.js';

const createNoFuturePointTemplate = () =>
  `<section class="trip-events">
    <p class="trip-events__msg">There are no future events now</p>
  </section>`;


export default class NoFuturePoint extends AbstractView {

  get template() {
    return createNoFuturePointTemplate();
  }
}
