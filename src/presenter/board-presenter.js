import {remove, render} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter.js';
import PointContainerView from '../view/point-container-view';
import {SortType, UpdateType, UserAction, filter, FilterType} from '../const.js';
import NoFuturePoint from '../view/no-future-point-view.js';
import NewPointPresenter from './new-point-presenter.js';


const siteMainElement = document.querySelector('.trip-events');

export class BoardPresenter {
  #renderContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  pointPresenter = new Map();
  #pointContainerView = new PointContainerView();
  noPointList = null;
  currentSortType = SortType.DATE;
  filterType = FilterType.ALL;
  noFuturePointList = null;
  //newPointPresenter = null;

  constructor({renderContainer, pointModel, offerModel, destinationModel, filterModel, onNewPointDestroy}) {
    this.#renderContainer = renderContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.filterModel = filterModel;
    this.#pointModel.addObserver(this.handleModelEvent);
    this.filterModel.addObserver(this.handleModelEvent);

    this.newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointContainerView.element,
      onDataChange: this.handleViewAction,
      onDestroy: onNewPointDestroy
    });

  }

  createPoint() {
    this.currentSortType = SortType.DEFAULT;
    this.filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.newPointPresenter.init();
  }

  getPoint() {
    this.filterType = this.filterModel.filter;
    const filteredPoints = filter[this.filterType](this.#pointModel.points);
    switch (this.currentSortType) {
      case SortType.DATE:
        return filteredPoints.sort((a, b) => a['date_from'] > b['date_from'] ? 1 : -1);
      case SortType.PRICE:
        return filteredPoints.sort((a, b) => a['base_price'] < b['base_price'] ? 1 : -1);
    }
    return filteredPoints;
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
        this.#renderBoard();
        break;
    }
  };


  init() {
    this.renderSortView();
    this.#renderBoard();
  }

  #renderBoard() {
    this.points = this.getPoint();
    if (this.points.length === 0 && this.filterType === 'future') {
      this.renderNoFuturePointsList();
      return;
    }

    if (this.points.length === 0) {
      this.renderNoPointsList();
      return;
    }

    for (const point of this.points) {
      const offerIds = point.offers;
      const destination = this.#destinationModel.getDestinationById(point.destination);
      const offers = this.#offerModel.getOfferById(offerIds);
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
    this.currentSortType = SortType.PRICE;
    this.#renderBoard();
  };

  sortByDateHandler = () => {
    this.clearPointList();
    this.currentSortType = SortType.DATE;
    this.#renderBoard();
  };

  renderNoPointsList() {
    this.noPointList = new EmptyListView();
    render(this.noPointList, this.#renderContainer);
  }

  renderNoFuturePointsList() {
    this.noFuturePointList = new NoFuturePoint();
    render(this.noFuturePointList, this.#renderContainer);
  }

  clearPointList() {
    this.newPointPresenter.destroy();
    this.pointPresenter.forEach((presenter) => presenter.destroy());
    this.pointPresenter.clear();
    if(this.noPointList){
      remove(this.noPointList);
    }
    if(this.noFuturePointList){
      remove(this.noFuturePointList);
    }
  }

  handleModeChange = () => {
    this.newPointPresenter.destroy();
    this.pointPresenter.forEach((presenter) => presenter.resetView());
  };

}
