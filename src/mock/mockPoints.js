import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    'base_price': 1100,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'i bus',
    'id': '0',
    'offers': 'offers',
    'type': 'bus'
  },
  {
    'base_price': 2000,
    'date_from': '2018-01-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'i fly',
    'id': '0',
    'offers': 'offers',
    'type': 'fly'
  },
  {
    'base_price': 1500,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'train',
    'id': '0',
    'offers': 'offers',
    'type': 'train'
  },
  {
    'base_price': 1900,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'offers',
    'id': '0',
    'offers': 'offers',
    'type': 'ship'
  },{
    'base_price': 1000,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'offers',
    'id': '0',
    'offers': 'offers',
    'type': 'drive'
  }
];

export function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

