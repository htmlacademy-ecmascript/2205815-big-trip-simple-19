import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM YYYY';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}
export {getRandomArrayElement, humanizePointDueDate};
