import FilterView from './filter-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.trip-main');

render(new FilterView(), siteMainElement);
