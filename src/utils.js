import dayjs from 'dayjs';

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

export {humanizePointDueDate, isSelectedOffer};
