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

// export const updatePrices = (apiData: IData, data: IData): IData => {
//   console.log('hello');
//   return data.prices.map((item, index) => ({
//     ...item,
//     index: index,
//     unix: item.unix,
//     value: item.value,
//   }));

//   // data.prices.map(([unix, value], index) => ({
//   //   index: index,
//   //   unix: unix,
//   //   value: value,
//   // }));

//   // setMarketCaps(
//   //   data.market_caps.map(([unix, value], index) => ({
//   //     index,
//   //     unix,
//   //     value,
//   //   }))
//   // );

//   // setTotalVolumes(
//   //   data.total_volumes.map(([unix, value], index) => ({
//   //     index,
//   //     unix,
//   //     value,
//   //   }))
//   // );
// };
