import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import DestinationView from '../view/destination-view';
import OfferView from '../view/offer-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #renderContainer = null;

  pointComponent = null;
  pointEditFormComponent = null;

  point = null;
  #mode = Mode.DEFAULT;

  constructor({renderContainer, onModeChange}) {
    this.#renderContainer = renderContainer;
    this.handleModeChange = onModeChange;

  }

  init(point) {
    this.point = point;
    const prevPointComponent = this.pointComponent;
    const prevPointEditFormComponent = this.pointEditFormComponent;
    const {destination, offers} = point;

    this.pointComponent = new PointView({point: this.point,
      onEditFormClick: this.handleEditClick});


    this.pointEditFormComponent = new EditPointView({point: this.point,
      onCloseBtnClick: this.handleFormSubmit});

    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.pointComponent, this.#renderContainer);
      render(new OfferView(offers), this.pointEditFormComponent.element);
      return render(new DestinationView({destination}), this.pointEditFormComponent.element);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.pointComponent.element, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.pointEditFormComponent, prevPointEditFormComponent);
    }

    remove(this.prevPointComponent);
    remove(this.prevPointEditFormComponent);
  }

  destroy() {
    remove(this.pointComponent);
    remove(this.pointEditFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.replaceFormToPoint();
    }
  }

  replaceCardToForm() {
    replace(this.pointEditFormComponent, this.pointComponent);
    document.addEventListener('keydown', this.escKeyDownHandler);
    this.handleModeChange();
    this.#mode = Mode.EDITING;
  }

  replaceFormToPoint() {
    replace(this.pointComponent, this.pointEditFormComponent);
    document.removeEventListener('keydown', this.escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.replaceFormToPoint();
    }
  };

  handleEditClick = () => {
    this.replaceCardToForm();
  };

  handleFormSubmit = () => {
    this.replaceFormToPoint();
  };
}
