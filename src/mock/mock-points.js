import {getRandomArrayElement} from '../utils.js';
import {offerType} from '../const.js';


export const mockPoints = [
  {
    'base_price': 1100,
    'date_from': '2019-07-10T01:55:56.845Z',
    'date_to': '2019-07-11T02:22:13.375Z',
    'destination': 1,
    'id': '1',
    'offers': offerType,
    'type': 'taxi',
  },
];

export function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}
