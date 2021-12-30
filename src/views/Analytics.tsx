import DatePicker from '../components/DatePicker/DatePicker';
import BitcoinTardis from '../components/Bitcoin/BitcoinTardis';
import BitcoinVolume from '../components/Bitcoin/BitcoinVolume';
import BitcoinBearish from '../components/Bitcoin/BitcoinBearish';

export default function Analytics() {
  return (
    <div>
      <div className='header'>
        <div className='header-safezone'>
          <div className='header-content'>
            <DatePicker />
          </div>
          <div className='header-content'>
            <BitcoinBearish />
            <BitcoinVolume />
            <BitcoinTardis />
          </div>
        </div>
      </div>
    </div>
  );
}
