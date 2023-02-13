const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  INIT: 'INIT'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  ALL: 'all'
};

const today = new Date();

const filter = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.dateTo) > today)
};

const OFFERS_BY_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export {SortType, UserAction, UpdateType, FilterType, filter, OFFERS_BY_TYPE};
