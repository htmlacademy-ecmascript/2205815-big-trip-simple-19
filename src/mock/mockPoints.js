import {getRandomArrayElement} from '../utils.js';
import {pointType} from '../const.js';
import {destinationType} from '../const.js';
import {offerType} from '../const.js';


const mockPoints = [
  {
    'base_price': 1100,
    'date_from': '2019-07-10T01:55:56.845Z',
    'date_to': '2019-07-11T02:22:13.375Z',
    'destination': getRandomArrayElement(destinationType),
    'id': '1',
    'offers': getRandomArrayElement(offerType),
    'type': getRandomArrayElement(pointType),
    'offer_price': 10
  },
  {
    'base_price': 2000,
    'date_from': '2018-01-10T03:55:56.845Z',
    'date_to': '2019-07-11T04:22:13.375Z',
    'destination': getRandomArrayElement(destinationType),
    'id': '2',
    'offers': getRandomArrayElement(offerType),
    'type': getRandomArrayElement(pointType),
    'offer_price': 20
  },
  {
    'base_price': 1500,
    'date_from': '2019-07-10T05:55:56.845Z',
    'date_to': '2019-07-11T11:06:13.375Z',
    'destination': getRandomArrayElement(destinationType),
    'id': '3',
    'offers': getRandomArrayElement(offerType),
    'type': getRandomArrayElement(pointType),
    'offer_price': 30
  },
  {
    'base_price': 1900,
    'date_from': '2019-07-10T07:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(destinationType),
    'id': '4',
    'offers': getRandomArrayElement(offerType),
    'type': getRandomArrayElement(pointType),
    'offer_price': 40
  },
  {
    'base_price': 1000,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(destinationType),
    'id': '6',
    'offers': getRandomArrayElement(offerType),
    'type': getRandomArrayElement(pointType),
    'offer_price': 50
  },
];

export function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

