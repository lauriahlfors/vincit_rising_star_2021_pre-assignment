import { useStoreContext } from '../../store/store';
import { ReactComponent as Prev } from '../../svg/chevron-left-solid.svg';
import { ReactComponent as Next } from '../../svg/chevron-right-solid.svg';

export default function DatePickerNav() {
  const { datePicker, updateDatePicker } = useStoreContext();
  return (
    <div className='datepicker-nav'>
      <button
        className='button button-icon'
        onClick={() => updateDatePicker(-1)}>
        <Prev className='svg' />
      </button>
      <h3>{datePicker.currentMonthName}</h3>
      <h3>{datePicker.currentYear}</h3>
      <button
        className='button button-icon'
        onClick={() => updateDatePicker(1)}>
        <Next className='svg' />
      </button>
    </div>
  );
}
