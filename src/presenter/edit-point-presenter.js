import {render} from '../render.js';
import {EditPointView} from '../view/edit-point-view.js';

export class EditPointPresenter {
  renderContainer = null;

  constructor({renderContainer, editEventForm}) {
    this.renderContainer = renderContainer;
    this.editEventForm = editEventForm;
  }

  init() {
    this.editEvents = this.editEventForm.getPoint();
    render(new EditPointView({editEventForm: this.editEvents}), this.renderContainer);
  }
}
