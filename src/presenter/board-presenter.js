import {remove, render, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter.js';
import PointContainerView from '../view/point-container-view';
import {SortType, UpdateType, UserAction, filter, FilterType} from '../const.js';
import NoFuturePoint from '../view/no-future-point-list-view.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';


const siteMainElement = document.querySelector('.trip-events');
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export class BoardPresenter {
  #renderContainer = null;
  #pointModel = null;
  #offerModel = null;
  pointPresenter = new Map();
  #pointContainerView = new PointContainerView();
  #loadingComponent = new LoadingView();
  noPointList = null;
  #sortView = null;
  currentSortType = SortType.DATE;
  filterType = FilterType.ALL;
  #isLoading = true;
  noFuturePointList = null;
  newPointPresenter = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({renderContainer, pointModel, offerModel, destinationModel, filterModel, onNewPointDestroy}) {
    this.#renderContainer = renderContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.destinationModel = destinationModel;
    this.filterModel = filterModel;
    this.#pointModel.addObserver(this.handleModelEvent);
    this.filterModel.addObserver(this.handleModelEvent);
    this.#offerModel.addObserver(this.handleModelEvent);
    this.destinationModel.addObserver(this.handleModelEvent);


    this.newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointContainerView.element,
      onDataChange: this.handleViewAction,
      onDestroy: onNewPointDestroy,
      offers: this.#offerModel.offers,
      destinations : this.destinationModel.destinations
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

  handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        if ( data !== 'POINTS') {
          break;
        }
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  init() {
    this.#renderBoard();
  }

  #renderBoard() {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.points = this.getPoint();
    this.destinations = this.destinationModel.destinations;
    this.offers = this.#offerModel.offers;
    if (this.points.length === 0 && this.filterType === 'future') {
      this.renderNoFuturePointsList();
      return;
    }

    if (this.points.length === 0) {
      this.renderNoPointsList();
      return;
    }

    for (const point of this.points) {
      this.#renderPoint(point, this.offers, this.destinations);
    }

    if (!this.#sortView) {
      this.renderSortView();
    }

    render(this.#pointContainerView, siteMainElement);
  }


  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({
      renderContainer: this.#pointContainerView.element,
      onModeChange: this.handleModeChange,
      onDataChange: this.handleViewAction,
      offers: this.offers,
      destination: this.destinations
    });
    pointPresenter.init(point, offers, destination);
    this.pointPresenter.set(point.id, pointPresenter);
  }

  renderSortView() {
    this.#sortView = new SortView({
      clickSortByPriceHandler: this.sortByPriceHandler,
      clickSortByDateHandler: this.sortByDateHandler
    });

    render(this.#sortView, siteMainElement);
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

  #renderLoading() {
    render(this.#loadingComponent, this.#renderContainer, RenderPosition.AFTERBEGIN);
  }

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
    if (this.#loadingComponent) {
      remove(this.#loadingComponent);
    }
  }

  handleModeChange = () => {
    this.newPointPresenter.destroy();
    this.pointPresenter.forEach((presenter) => presenter.resetView());
  };

}
