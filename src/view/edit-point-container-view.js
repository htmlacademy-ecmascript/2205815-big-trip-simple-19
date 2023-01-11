import {createElement} from '../render';

const createEditPointContainerTemplate = () =>
  `<form class="event event--edit" action="#" method="post">
</form>`;

export class EditPointContainerView {

  getTemplate() {
    return createEditPointContainerTemplate();
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
