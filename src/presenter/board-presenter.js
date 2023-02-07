import {render} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter.js';
import PointContainerView from '../view/point-container-view';
import {SortType, UpdateType, UserAction} from '../const.js';

const siteMainElement = document.querySelector('.trip-events');

export class BoardPresenter {
  #renderContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  pointPresenter = new Map();
  #pointContainerView = new PointContainerView();
  noPointList = new EmptyListView();
  #currentSortType = SortType.DEFAULT;

  constructor({renderContainer, pointModel, offerModel, destinationModel}) {
    this.#renderContainer = renderContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#pointModel.addObserver(this.handleModelEvent);

  }

  getPoint() {
    this.points = Array.from(this.#pointModel.getPoint());

    /*
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#pointModel.getPoint].sort(sortTaskUp);
      case SortType.PRICE:
        return [...this.#pointModel.getPoint].sort(sortTaskDown);
    }
    */
  }

  handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.clearPointList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.clearPointList();
        this.renderSortView();
        break;
    }
  };


  init() {
    this.renderSortView();
    this.#renderBoard();
  }

  #renderBoard() {
    this.getPoint();
    if (this.points.length === 0) {
      this.renderNoPointsList();
      return;
    }

    for (const point of this.points) {
      const offerIds = point.offers;
      // point.offers = this.#offerModel.getOfferById(offerIds);
      const destination = this.#destinationModel.getDestinationById(point.destination);
      //console.log(destination);

      //point.destination = this.#destinationModel.getDestinationById(point.destination);


      const offers = this.#offerModel.getOfferById(offerIds);
      //console.log(offers);
      this.#renderPoint(point, offers, destination);
    }

    render(this.#pointContainerView, siteMainElement);
  }


  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({
      renderContainer: this.#pointContainerView.element,
      onModeChange: this.handleModeChange,
      onDataChange: this.handleViewAction
    });
    pointPresenter.init(point, offers, destination);
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
