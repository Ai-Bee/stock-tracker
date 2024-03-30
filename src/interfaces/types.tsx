export interface WeeklyTimeSeriesData {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  }
  
  export interface MetaData {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
  }
  
  export interface StockData {
    "Meta Data": MetaData;
    "Weekly Time Series": WeeklyTimeSeriesData;
  }

export type IconStates = "caret-down"

export type timePeriods = "TIME_SERIES_WEEKLY" | "TIME_SERIES_DAILY" | "TIME_SERIES_INTRADAY" | "TIME_SERIES_MONTHLY"

export interface optionsFormat {
    title: string
    value: string
}

export type StockInfo = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
};