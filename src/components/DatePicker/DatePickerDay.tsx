import {
  addHours,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  subDays,
} from 'date-fns';
import { useStoreContext } from '../../store/store';

// date picker functions to export to the store
export default function DatePickerDay({
  dayData,
}: {
  dayData: { day: number; month: number; year: number };
}) {
  const { datePicker, updateSelectedDates, startDate, endDate } =
    useStoreContext();

  const thisDay = addHours(
    new Date(dayData.year, dayData.month, dayData.day),
    2
  );

  // initialize classNameList array with default className for
  // every day
  let classNameList = ['datepicker-day'];

  // if day is today
  if (isSameDay(new Date(), thisDay)) {
    classNameList.push('today');
  }

  // if day is not in current month or its in the future
  if (
    !isSameMonth(
      new Date(datePicker.currentYear, datePicker.currentMonth),
      new Date(dayData.year, dayData.month)
    ) ||
    isAfter(thisDay, new Date())
  ) {
    classNameList.push('muted');
  }

  // if day is after today
  if (isAfter(thisDay, new Date())) {
    classNameList.push('future');
  }

  // start
  if (isSameDay(thisDay, startDate.date)) {
    classNameList.push('start');
  }

  // between
  if (
    isAfter(thisDay, startDate.date) &&
    isBefore(thisDay, subDays(endDate.date, 1))
  ) {
    classNameList.push('between');
  }

  // end
  if (isSameDay(thisDay, endDate.date)) {
    classNameList.push('end');
  }

  return (
    <div
      className={classNameList.join(' ')}
      onClick={() =>
        classNameList.includes('future') ? null : updateSelectedDates(thisDay)
      }>
      {dayData.day}
    </div>
  );
}
