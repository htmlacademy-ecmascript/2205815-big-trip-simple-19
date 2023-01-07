import {render} from '../render';
import {EditPointView} from '../view/edit-point-view';
import {DestinationView} from '../view/destination-view';
import {EditPointContainerView} from '../view/edit-point-container-view';
import {OfferView} from '../view/offer-view';


export class EditPointPresenter {
  renderContainer = null;
  editPointContainerView = new EditPointContainerView();

  constructor({renderContainer, editEventForm, destinationModel, offerModel}) {
    this.renderContainer = renderContainer;
    this.editEventForm = editEventForm;
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
  }

  init() {
    this.editEvents = this.editEventForm.getPoint();
    const destination = this.destinationModel.getDestinationById(this.editEvents.destination);
    const offers = this.offerModel.getOfferById(this.editEvents.id);

    render(this.editPointContainerView, this.renderContainer);
    render(new EditPointView({editEventForm: this.editEvents}), this.editPointContainerView.getElement());
    render(new OfferView(offers), this.editPointContainerView.getElement());
    render(new DestinationView({destination}), this.editPointContainerView.getElement());
  }
}

