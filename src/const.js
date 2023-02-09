export const pointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const destinationType = ['Praga', 'St.Peterburg', 'Portu', 'London', 'Osaka', 'Rim', 'Barselona', 'Tokyo'];

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  ALL: 'all'
};

const today = new Date();

export const filter = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.date_to) > today)
};

