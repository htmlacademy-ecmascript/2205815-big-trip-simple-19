import {render} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter.js';

const siteMainElement = document.querySelector('.trip-events');

export class BoardPresenter {
  #renderContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  pointPresenter = new Map();

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

    this.sortView();
    this.#renderBoard();
  }

  #renderBoard() {

    if (this.points.length === 0) {
      render(new EmptyListView(), this.#renderContainer);
      return;
    }

    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  sortView() {
    const sortView = new SortView({
      clickSortByPriceHandler: () => {
        this.clearPointList();
        const points = Array.from(this.#pointModel.getPointByPrice());
        for (const point of points) {
          this.#renderPoint(point);
        }
      },
      clickSortByDateHandler: () => {
        this.clearPointList();
        const points = Array.from(this.#pointModel.getPoint());
        for (const point of points) {
          this.#renderPoint(point);
        }
      }
    });

    render(sortView, siteMainElement);
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      renderContainer: siteMainElement
    });
    pointPresenter.init(point);
  }

  clearPointList() {
    const openPoints = document.querySelectorAll('.trip-events__list');
    if(openPoints) {
      for (const point of openPoints) {
        point.remove();
      }
    }

  }

  sortByDateHandler() {
    this.clearPointList();
    const points = Array.from(this.#pointModel.getPoint());
    for (const point of points) {
      this.#renderPoint(point);
    }
    render(this.sortView, siteMainElement);
  }

  sortByPriceHandler() {
    this.clearPointList();
    const points = Array.from(this.#pointModel.getPointByPrice());
    for (const point of points) {
      this.#renderPoint(point);
    }
    render(this.sortView, siteMainElement);
  }
}
