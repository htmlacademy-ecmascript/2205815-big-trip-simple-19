import {POINT_DESTINATION} from '../mock/mock-destination';


export class DestinationModel {
  destinations = POINT_DESTINATION;

  getDestinationById(id) {
    return this.destinations.find((element) => element.id === id);
  }
}

