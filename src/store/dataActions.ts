import { Dispatch, SetStateAction } from 'react';
import { IData, IDataValues } from './types';

export const updateData = (
  apiData: IData,
  setPrices: Dispatch<SetStateAction<any[]>>,
  setTotalVolumes: Dispatch<SetStateAction<any[]>>
) => {
  setPrices(
    apiData.prices.map(([unix, value], index) => ({
      index,
      unix,
      value,
    }))
  );
  setTotalVolumes(
    apiData.total_volumes.map(([unix, value], index) => ({
      index,
      unix,
      value,
    }))
  );
};

