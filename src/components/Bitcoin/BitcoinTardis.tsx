import { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { ITardis } from '../../store/types';

// name references to tardis(time machine) from doctor who
export default function BitcoinTardis() {
  const { prices, getTardis } = useStoreContext();

  const [tardis, setTardis] = useState<ITardis>({} as ITardis);

  // call getTardis function when prices update
  useEffect(() => {
    if (prices.length !== 0) {
      setTardis(getTardis(prices));
    }
  }, [prices, setTardis, getTardis]);

  return (
    <div>
      <h1 className='text-white'>Best Buy Date</h1>
      <h3 className='text-white'>{tardis.buyDate}</h3>
      <p className='text-white'>
        <span className='text-green'>{tardis.buyValue}</span>€
      </p>
      <h1 className='text-white'>Best Sell Date</h1>
      <h3 className='text-white'>{tardis.sellDate}</h3>
      {/* if sell value is anything else than more than 0, return the value  */}
      {tardis.sellValue > 0 ? (
        <p className='text-white'>
          <span className='text-green'>{tardis.sellValue}</span>€
        </p>
      ) : null}
    </div>
  );
}
