/*
import {render} from '../render';
import {EditPointView} from '../view/edit-point-view';
import {DestinationView} from '../view/destination-view';
//import {EditPointContainerView} from '../view/point-container-view';
import {OfferView} from '../view/offer-view';


export class EditPointPresenter {
  #renderContainer = null;
  //#editPointContainer = new EditPointContainerView();
  #editEventForm = null;
  #destinationModel = null;
  #offerModel = null;

  constructor({renderContainer, editEventForm, destinationModel, offerModel}) {
    this.#renderContainer = renderContainer;
    this.#editEventForm = editEventForm;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.editEvents = this.#editEventForm.getPoint();
    const destination = this.#destinationModel.getDestinationById(this.editEvents.destination);
    const offers = this.#offerModel.getOfferById(this.editEvents.offers);

    render(this.#editPointContainer, this.#renderContainer);
    render(new EditPointView({editEventForm: this.editEvents}), this.#editPointContainer.element);
    render(new OfferView(offers), this.#editPointContainer.element);
    render(new DestinationView({destination}), this.#editPointContainer.element);
  }
}
*/
