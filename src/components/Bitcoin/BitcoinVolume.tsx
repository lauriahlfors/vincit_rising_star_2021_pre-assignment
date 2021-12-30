import { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { IVolume } from '../../store/types';

export default function BitcoinVolume() {
  const { totalVolumes, getVolume } = useStoreContext();

  const [volume, setVolume] = useState<IVolume>({} as IVolume);

  // call getVolume function when totalVolumes update
  useEffect(() => {
    if (totalVolumes.length !== 0) {
      setVolume(getVolume(totalVolumes));
    }
  }, [totalVolumes, setVolume, getVolume]);

  return (
    <div>
      <h1 className='text-white'>Highest Trading Volume</h1>
      <h3 className='text-white'>{volume.volumeDate}</h3>
      <h3 className='text-white text-space-bottom'>
        <span>Volume </span>
        <span className='text-green'>{volume.volumeAmount}</span>
      </h3>
    </div>
  );
}
