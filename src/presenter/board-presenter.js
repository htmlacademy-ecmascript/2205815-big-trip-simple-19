import {render} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter.js';
import PointContainerView from '../view/point-container-view';

const siteMainElement = document.querySelector('.trip-events');

export class BoardPresenter {
  #renderContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  pointPresenter = new Map();
  #pointContainerView = new PointContainerView();
  noPointList = new EmptyListView();

  constructor({renderContainer, pointModel, offerModel, destinationModel}) {
    this.#renderContainer = renderContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;

  }

  init() {
    this.points = Array.from(this.#pointModel.getPoint());
    for (const point of this.points) {
      const offerIds = point.offers;
      point.offers = this.#offerModel.getOfferById(offerIds);
      point.destination = this.#destinationModel.getDestinationById(point.destination);
    }
    this.renderSortView();
    this.#renderBoard();
  }

  #renderBoard() {

    if (this.points.length === 0) {
      this.renderNoPointsList();
      return;
    }

    for (const point of this.points) {
      this.#renderPoint(point);
    }

    render(this.#pointContainerView, siteMainElement);
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      renderContainer: this.#pointContainerView.element, onModeChange: this.handleModeChange});
    pointPresenter.init(point);
    this.pointPresenter.set(point.id, pointPresenter);
  }

  renderSortView() {
    const sortView = new SortView({
      clickSortByPriceHandler: this.sortByPriceHandler,
      clickSortByDateHandler: this.sortByDateHandler
    });

    render(sortView, siteMainElement);
  }

  sortByPriceHandler = () => {
    this.clearPointList();
    const points = Array.from(this.#pointModel.getPointByPrice());
    for (const point of points) {
      this.#renderPoint(point);
    }
  };

  sortByDateHandler = () => {
    this.clearPointList();
    const points = Array.from(this.#pointModel.getPoint());
    for (const point of points) {
      this.#renderPoint(point);
    }
  };

  renderNoPointsList() {
    render(this.noPointList, this.#renderContainer);
  }

  clearPointList() {
    this.pointPresenter.forEach((presenter) => presenter.destroy());
    this.pointPresenter.clear();
  }

  handleModeChange = () => {
    this.pointPresenter.forEach((presenter) => presenter.resetView());
  };

}
