import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

const isSelectedOffer = (selectOffers, id) => {
  for(const selectedOfferId of selectOffers) {
    if (selectedOfferId === id) {
      return true;
    }
  }
};

export {getRandomArrayElement, humanizePointDueDate, isSelectedOffer};
