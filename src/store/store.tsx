import {
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getUnixTime,
  getYear,
  set,
  startOfMonth,
  subDays,
} from 'date-fns';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { updateDatePicker, updateSelectedDates } from './datePickerActions';
import {} from './datePickerActions';
import { updateData } from './dataActions';
import {
  filteredDates,
  getBearish,
  getVolume,
  getTardis,
} from './bitcoinActions';
import { IDatePicker, IDay, IData, IDataValues } from './types';
import axios from 'axios';

// store.tsx works as state management

const useStore = () => {
  // datepicker state
  const [datePicker, setDatePicker] = useState<IDatePicker>({
    currentDate: new Date(),
    currentMonth: getMonth(new Date()),
    currentYear: getYear(new Date()),
    currentMonthDays: getDaysInMonth(new Date()),
    currentMonthFirstWeekDay: getDay(startOfMonth(new Date())),
    currentMonthName: format(new Date(new Date()), 'LLLL'),
  } as IDatePicker);

  // end date state
  const [endDate, setEndDate] = useState<IDay>({
    date: set(new Date(), { hours: 2, minutes: 0, seconds: 0 }),
    unix: getUnixTime(set(new Date(), { hours: 2, minutes: 0, seconds: 0 })),
  } as IDay);

  // start date state
  const [startDate, SetStartDate] = useState<IDay>({
    date: subDays(endDate.date, 7),
    unix: getUnixTime(subDays(endDate.date, 7)),
  } as IDay);

  // url state
  // set default values to current start and end date
  const [url, setUrl] = useState<string>(
    'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=' +
      startDate.unix +
      '&to=' +
      endDate.unix
  );

  // data
  const [data, setData] = useState<IData>({} as IData);
  // const [data, setData] = useState<IDataValues[]>([]);
  const [prices, setPrices] = useState<IDataValues[]>([]);
  const [totalVolumes, setTotalVolumes] = useState<IDataValues[]>([]);

  // fetch data from api
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [url]);

  // when data state is updated call
  // update data to fill needed data arrays
  useEffect(() => {
    if (Object.keys(data).length === 0) {
    } else {
      updateData(data, setPrices, setTotalVolumes);
    }
  }, [data]);

  // return states, setStates and functions set and get different values
  return {
    datePicker,

    startDate,
    SetStartDate,

    endDate,
    setEndDate,

    url,
    setUrl,

    data,
    setData,

    prices,
    setPrices,

    totalVolumes,
    setTotalVolumes,

    getBearish: (prices: IDataValues[]) => getBearish(filteredDates(prices)),

    getVolume: (marketCaps: IDataValues[]) =>
      getVolume(filteredDates(marketCaps)),

    getTardis: (prices: IDataValues[]) => getTardis(filteredDates(prices)),

    updateDatePicker: (value: number) =>
      setDatePicker((dp) => updateDatePicker(dp, value)),

    updateSelectedDates: (selectedDate: Date) =>
      updateSelectedDates(
        selectedDate,
        startDate,
        SetStartDate,
        endDate,
        setEndDate
      ),
  };
};

// initialize store context
const StoreContext = createContext<ReturnType<typeof useStore> | null>(null);

// export store context
export const useStoreContext = () => useContext(StoreContext)!;

// export store provider
export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>
  );
}
