import {render} from '../render';
import {PointView} from '../view/point-view';
import {EditPointView} from '../view/edit-point-view';
import {EmptyListView} from '../view/empty-list-view';
import {SortView} from '../view/sort-view';
import {OfferView} from '../view/offer-view';
const siteMainElement = document.querySelector('.trip-events');

export class BoardPresenter {
  #renderContainer = null;
  #pointModel = null;

  constructor({renderContainer, pointModel}) {
    this.#renderContainer = renderContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {

    if (this.pointModel) {
      return render(new EmptyListView(),this.#renderContainer);
    }
    render(new SortView(), siteMainElement);
    this.boardPoints = this.#pointModel.getPoint();
    this.#renderPoint(this.boardPoints);
  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});
    const pointEditFormComponent = new EditPointView({point});

    const replacePointToEditForm = () => {
      this.#renderContainer.replaceChild(pointEditFormComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#renderContainer.replaceChild(pointComponent.element, pointEditFormComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#renderContainer);
    //render(new OfferView(), this.#renderContainer);
  }
}
