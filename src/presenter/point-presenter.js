import {render} from '../framework/render.js';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import DestinationView from '../view/destination-view';
import PointContainerView from '../view/point-container-view';
import OfferView from '../view/offer-view';


export default class PointPresenter {
  #renderContainer = null;
  pointComponent = null;
  pointEditFormComponent = null;

  point = null;

  #pointContainerView = new PointContainerView();

  constructor({renderContainer}) {
    this.#renderContainer = renderContainer;

  }

  init(point) {
    this.point = point;
    const prevPointComponent = this.pointComponent;
    const prevPointEditFormComponent = this.pointEditFormComponent;

    const {destination, offers} = point;

    const pointComponent = new PointView({point: this.point,
      onEditFormClick: () => {
        this.closeOpenForm();
        showEditForm();

        document.addEventListener('keydown', escKeyDownHandler);
        document.addEventListener('submit', (evt) => {
          evt.preventDefault();
          closeEditForm();
        });
      }
    });

    const pointEditFormComponent = new EditPointView({point: this.point,
      onCloseBtnClick: () => {
        closeEditForm();
        document.removeEventListener('keydown', escKeyDownHandler);}
    });

    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.#pointContainerView, this.#renderContainer);
      render(new OfferView(offers), pointEditFormComponent.element);
      render(new DestinationView({destination}), pointEditFormComponent.element);
      render(pointComponent, this.#pointContainerView.element);
    } else {
      prevPointComponent.remove();
      prevPointEditFormComponent.remove();
      render(this.#pointContainerView, this.#renderContainer);
      render(new OfferView(offers), pointEditFormComponent.element);
      render(new DestinationView({destination}), pointEditFormComponent.element);
      render(pointComponent, this.#pointContainerView.element);
    }

    function showEditForm(){
      pointComponent.element.append(pointEditFormComponent.element);
    }

    function closeEditForm() {
      pointEditFormComponent.element.remove();
    }

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeEditForm();
        document.removeEventListener('keydown', this.escKeyDownHandler);
      }
    }
  }

  closeOpenForm = () => {
    const openForms = document.querySelectorAll('.event--edit');
    if (openForms) {
      for (const form of openForms) {
        form.remove();
      }
    }
  };

  destroy() {
    this.pointComponent.remove();
    this.pointEditFormComponent.remove();
  }
}
