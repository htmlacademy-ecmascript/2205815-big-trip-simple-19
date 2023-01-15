import {createElement} from '../render';

const createEditPointContainerTemplate = () =>
  `<form class="event event--edit" action="#" method="post">
</form>`;

export class EditPointContainerView {
  #element = null;

  get template() {
    return createEditPointContainerTemplate();
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
