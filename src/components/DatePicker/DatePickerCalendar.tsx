import { getDaysInMonth, subMonths } from 'date-fns';
import { useStoreContext } from '../../store/store';
import DatePickerDay from './DatePickerDay';

export default function DatePickerCalendar() {
  const { datePicker } = useStoreContext();

  const calendarLenght = 6 * 7;
  const calendarMonthRange =
    datePicker.currentMonthDays + datePicker.currentMonthFirstWeekDay;
  const calendarDays = [];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let day = datePicker.currentMonthFirstWeekDay - 1; day >= 1; day--) {
    calendarDays.push({
      day: getDaysInMonth(subMonths(datePicker.currentDate, 1)) - day + 1,
      month: datePicker.currentMonth - 1 < 0 ? 11 : datePicker.currentMonth - 1,

      // check if previous month value is lower than 0
      // if true set year to current year - 1
      // else set year as current year
      year:
        datePicker.currentMonth - 1 < 0
          ? datePicker.currentYear - 1
          : datePicker.currentYear,
    });
  }

  for (let day = 1; day <= datePicker.currentMonthDays; day++) {
    calendarDays.push({
      day: day,
      month: datePicker.currentMonth,
      year: datePicker.currentYear,
    });
  }

  for (let day = 1; day <= calendarLenght - calendarMonthRange + 1; day++) {
    calendarDays.push({
      day: day,
      // check if next month is higher than 11
      // set month to 0 (january) if true
      month: datePicker.currentMonth + 1 > 11 ? 0 : datePicker.currentMonth + 1,

      // check if next month is higher than 11
      // if true set year as current year + 1
      // else set year to current year
      year:
        datePicker.currentMonth + 1 > 11
          ? datePicker.currentYear + 1
          : datePicker.currentYear,
    });
  }

  return (
    <div className='datepicker-calendar'>
      {weekDays.map((day, key) => {
        return (
          <div key={key} className='datepicker-day'>
            {day}
          </div>
        );
      })}
      {calendarDays.map((dayData, key) => {
        return <DatePickerDay key={key} dayData={dayData} />;
      })}
    </div>
  );
}
