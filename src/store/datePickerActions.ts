import { Dispatch, SetStateAction } from 'react';
import {
  getMonth,
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
  getYear,
  getDay,
  format,
  isBefore,
  isSameDay,
  getUnixTime,
  subDays,
  isAfter,
  endOfDay,
  startOfDay,
  addHours,
} from 'date-fns';
import { IDatePicker, IDay } from './types';

export const updateDatePicker = (
  datePicker: IDatePicker,
  value: number
): IDatePicker => {
  const currentDate = datePicker.currentDate;

  const newDate =
    value > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1);
  const newMonth = getMonth(newDate);
  const newYear = getYear(newDate);
  const newMonthDays = getDaysInMonth(newDate);
  const newMonthFirstWeekDay =
    getDay(startOfMonth(newDate)) === 0 ? 7 : getDay(startOfMonth(newDate));
  const newMonthName = format(new Date(newDate), 'LLLL');

  return {
    currentDate: newDate,
    currentMonth: newMonth,
    currentYear: newYear,
    currentMonthDays: newMonthDays,
    currentMonthFirstWeekDay: newMonthFirstWeekDay,
    currentMonthName: newMonthName,
  };
};

export const updateSelectedDates = (
  selectedDate: Date,
  startDate: IDay,
  setStartDate: Dispatch<SetStateAction<IDay>>,
  endDate: IDay,
  setEndDate: Dispatch<SetStateAction<IDay>>
) => {
  const newEndDate = addHours(selectedDate, 2);
  const newStartDate = addHours(selectedDate, 2);

  // if selected date is before current start date
  // or end date and start date is not the same day
  // set date values to start and end of the day
  if (
    isBefore(selectedDate, startDate.date) ||
    !isSameDay(endDate.date, startDate.date)
  ) {
    setEndDate({
      date: newEndDate,
      unix: getUnixTime(newEndDate),
    });
    setStartDate({
      date: newStartDate,
      unix: getUnixTime(newStartDate),
    });
  }
  // else if selected date is same as current start date
  // and same as current end date set default interval
  // from current day to 7 days ago
  else if (
    isSameDay(selectedDate, startDate.date) &&
    isSameDay(selectedDate, endDate.date)
  ) {
    setEndDate({
      date: startOfDay(new Date()),
      unix: getUnixTime(startOfDay(new Date())),
    });
    setStartDate({
      date: startOfDay(subDays(new Date(), 7)),
      unix: getUnixTime(endOfDay(subDays(new Date(), 7))),
    });
  }
  // else if selected date is after current start date
  // set end date to selected date
  else if (isAfter(selectedDate, startDate.date)) {
    setEndDate({
      date: newEndDate,
      unix: getUnixTime(newEndDate),
    });
  }
};
