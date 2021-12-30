import DatePickerNav from './DatePickerNav';
import DatePickerCalendar from './DatePickerCalendar';
import { useStoreContext } from '../../store/store';
import { useEffect } from 'react';

function DatePicker() {
  const { startDate, endDate, setUrl } = useStoreContext();

  useEffect(() => {
    setUrl(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=' +
        startDate.unix +
        '&to=' +
        endDate.unix
    );
  }, [startDate, endDate, setUrl]);

  return (
    <div className='datepicker '>
      <DatePickerNav />
      <DatePickerCalendar />
    </div>
  );
}

export default DatePicker;
