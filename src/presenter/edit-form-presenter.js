import {render} from '../render.js';
import {EventEditFormView} from '../view/edit-form-view.js';
import {OfferContainerView} from '../view/offer-container-view.js';

export class EventEditFormPresenter {
  renderContainer = null;

  constructor({renderContainer, editEventForm}) {
    this.renderContainer = renderContainer;
    this.editEventForm = editEventForm;
  }

  init() {
    this.editEvents = this.editEventForm.getEvent();
    render(new EventEditFormView({editEventForm: this.editEvents}), this.renderContainer);
  }
}
