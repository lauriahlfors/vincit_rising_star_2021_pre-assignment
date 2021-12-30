export interface IDatePicker {
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  currentMonthDays: number;
  currentMonthFirstWeekDay: number;
  currentMonthName: string;
}

export interface IDay {
  date: Date;
  unix: number;
}

export interface IData {
  prices: any[];
  market_caps: any[];
  total_volumes: any[];
}

export interface IDataValues {
  index: number;
  value: number;
  unix: number;
}

interface IBitcoin {
  index: number;
  value: number;
  unix: number;
}

export interface ITardis {
  buyDate: string;
  buyValue: number;
  sellDate: string;
  sellValue: number;
}

export interface IVolume {
  volumeDate: string;
  volumeAmount: number;
}
