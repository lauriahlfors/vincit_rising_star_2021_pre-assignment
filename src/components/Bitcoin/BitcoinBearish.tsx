import { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';

export default function BitcoinBearish() {
  const { prices, getBearish } = useStoreContext();

  const [bearish, setBearish] = useState<number>(0);

  // call getBearish function when prices update
  useEffect(() => {
    if (prices.length !== 0) {
      setBearish(getBearish(prices));
    }
  }, [getBearish, prices]);

  return (
    <div>
      <h1 className='text-white'>Longest Bearish</h1>
      <h3 className='text-white text-space-bottom'>
        <span>Days </span>
        <span className='text-green'>{bearish}</span>
      </h3>
    </div>
  );
}
