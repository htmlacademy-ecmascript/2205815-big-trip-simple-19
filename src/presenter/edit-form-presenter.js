import {render} from '../render.js';
import {EventEditFormView} from '../view/edit-form-view.js';

export class EventEditFormPresenter {
  renderContainer = null;

  constructor({renderContainer, editEventForm,}) {
    this.renderContainer = renderContainer;
    this.editEventForm = editEventForm;
  }

  init() {
    this.editEvents = [...this.editEventForm.getEvent()];

    for ( let i = 0; i < this.editEvents.length; i++) {
      render(new EventEditFormView({editEventForm: this.editEvents[i]}), this.renderContainer);
    }
  }
}
