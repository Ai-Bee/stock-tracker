import { Fragment } from "react/jsx-runtime";
import NetworkInstance1 from "../utils/NetworkInstance";
import { useEffect, useState } from "react";
import appData from "./RawData";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { StockData } from "../interfaces/types";

interface ChartsProps {
  timePeriod: string;
  symbol: string;
}

// Function to fetch live candlestick data (replace with your actual implementation)
const MyChart = ({ timePeriod, symbol }: ChartsProps) => {
  const RawData = appData["Weekly Time Series"];
  const [chartDataLocal, setChartDataLocal] = useState<(string | number)[][]>(
    []
  );
  const [chartTitle] = useState('')

  const networkInstance = NetworkInstance1();

  const options = {
    title: {
      text: chartTitle,
    },
    rangeSelector: {
      allButtonsEnabled: true,
      selected: 2,
    },
    series: [
      {
        type: "candlestick",
        data: chartDataLocal,
      },
    ],
  };

  const fetchData = async () => {
    try {
      const { data, status } = await networkInstance.get(
        `/query?function=${timePeriod}&symbol=${symbol}&apikey=${process.env.API_KEY}`
      );
      if (status === 200) {
       if (data.hasOwnProperty('Information')) {
        const candlestickData = Object.entries(RawData).slice(0, 33).map(([date, values]) => {
          const open = parseFloat(values['1. open']);
          const high = parseFloat(values['2. high']);
          const low = parseFloat(values['3. low']);
          const close = parseFloat(values['4. close']);
          const volume = parseInt(values['5. volume']);
          return [date, open, high, low, close, volume];
        });
        setChartDataLocal(candlestickData)
       } else {
        const candlestickData = Object.entries(data as StockData).slice(0, 33).map(([date, values]) => {
          const open = parseFloat(values['1. open']);
          const high = parseFloat(values['2. high']);
          const low = parseFloat(values['3. low']);
          const close = parseFloat(values['4. close']);
          const volume = parseInt(values['5. volume']);
          return [date, open, high, low, close, volume];
        });
        setChartDataLocal(candlestickData);
       }
     
       
      }

    } catch (err) {}
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod, symbol]);

  // Update chart options with fetched data

  return (
    <Fragment>
        {
            chartDataLocal.length > 0 ?  <HighchartsReact highcharts={Highcharts} options={options} /> : 
            <div className="pb-24">
                <h4 className="text-center ">
                No data available, please select your chart details to begin..

                </h4>
            </div>
        }
    </Fragment>
  );
};

export default MyChart;
