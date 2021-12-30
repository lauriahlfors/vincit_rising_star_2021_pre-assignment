import { format, isSameDay } from 'date-fns';
import { IDataValues, ITardis, IVolume } from './types';

export const filteredDates = (prices: IDataValues[]): IDataValues[] => {
  let fDates = [];

  for (let i = 1; i < prices.length; i++) {
    if (!isSameDay(prices[i].unix, prices[i - 1].unix)) {
      fDates.push({
        index: prices[i - 1].index,
        unix: prices[i - 1].unix,
        value: prices[i - 1].value,
      });
    }
  }

  fDates.push({
    index: prices[prices.length - 1].index,
    unix: prices[prices.length - 1].unix,
    value: prices[prices.length - 1].value,
  });

  return fDates;
};

export const getTardis = (filteredDates: IDataValues[]): ITardis => {
  // get the best day to buy = lowest value
  const bestDayToBuy = filteredDates.reduce((a, b) => {
    return a.value < b.value ? a : b;
  });

  // check if the best day to buy is the last day in the array
  // return message to inform that its not wise to sell
  if (bestDayToBuy.unix === filteredDates[filteredDates.length - 1].unix) {
    return {
      buyDate: format(bestDayToBuy.unix, 'PP'),
      buyValue: bestDayToBuy.value,
      sellDate: 'Its not good idea to sell',
      sellValue: 0,
    };
  }
  // else if best day is any other day in the array continue
  else {
    // get rest of dates from the array after the best day to buy
    const restOftheDays = filteredDates.filter((data) => {
      return bestDayToBuy.unix < data.unix ? data : null;
    });

    // get best day to sell = highest value from the rest of the days
    const bestDayToSell = restOftheDays.reduce((a, b) => {
      return a.value > b.value ? a : b;
    });

    return {
      buyDate: format(bestDayToBuy.unix, 'PP'),
      buyValue: bestDayToBuy.value,
      sellDate: format(bestDayToSell.unix, 'PP'),
      sellValue: bestDayToSell.value,
    };
  }
};

export const getVolume = (filteredDates: IDataValues[]): IVolume => {
  const bestVolume = filteredDates.reduce((a, b) => {
    return a.value < b.value ? a : b;
  });

  return {
    volumeDate: format(bestVolume.unix, 'PP'),
    volumeAmount: bestVolume.value,
  };
};

export const getBearish = (filteredDates: IDataValues[]): number => {
  let values: any[] = [];
  let lds = Array.from(values, () => 1);
  let max = 0;

  filteredDates.forEach((data) => {
    values.push(data.value);
  });

  for (let i = 1; i < values.length; i++) {
    for (let j = 0; j < i; j++) {
      if (values[i] < values[j] && lds[i] < lds[j] + 1) {
        lds[i] = lds[j] + 1;
      } else {
        lds[i] = 1;
      }
    }
  }

  for (let i = 0; i < values.length; i++) {
    if (max < lds[i]) {
      max = lds[i];
    }
  }

  return max;
};
