import { MouseEvent, Suspense, useState } from "react";
import "./styles/App.css";
import AppLoader from "./components/AppLoader";
import MyChart from "./components/HighchartsView";
import CustomDropDown from "./components/CustomDropdown";
import { StockInfo, optionsFormat } from "./interfaces/types";
import NetworkInstance1 from "./utils/NetworkInstance";

function App() {
  const networkInstance = NetworkInstance1();

  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const availableTimePeriods: optionsFormat[] = [
    { title: "Weekly", value: "TIME_SERIES_WEEKLY" },
    { title: "Daily", value: "TIME_SERIES_DAILY" },
    { title: "Intraday", value: "TIME_SERIES_INTRADAY" },
    { title: "Monthly", value: "TIME_SERIES_MONTHLY" },
  ];
  const [timePeriod, setTimePeriod] = useState("");
  const [searchSymbol, setSearchSymbol] = useState("");
  const [availableSymbols, setAvailableSymbols] = useState<optionsFormat[]>([]);

  const fetchSymbols = async () => {
    try {
      setLoading(true)
      const { data, status } = await networkInstance.get(`/query?function=${searchSymbol}&keywords=tesco&apikey=${process.env.API_KEY}`);
      if (status === 200) {
       const response = data.bestMatches.map((item:StockInfo) => { return {title: item['2. name'], value: item['1. symbol'] } })
       setAvailableSymbols(response)
  
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  };

  const handlePeriodSelect = (selection: string) => {
    const selectedDate = availableTimePeriods.find(
      (item) => selection.toLocaleLowerCase() === item.title.toLocaleLowerCase()
    );
    if (selectedDate) setTimePeriod(selectedDate?.value);
  };

  const handleSearch = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    fetchSymbols()
  };

  return (
    <Suspense fallback={<AppLoader active />}>
      {
        loading ? <AppLoader active={loading} /> :
        <div className="App">
        <header className="App-header"></header>
        <div className="w-4/6 h-full mx-auto my-7 space-y-6 border-[1px] shadow-lg shadow-gray-600 rounded-lg ">
          <div className="flex justify-evenly m-5 p-4 bg-sky-200 rounded-lg shadow-md  items-center flex-wrap">
            <input
              onChange={(e) => setSearchSymbol(e.target.value)}
              value={searchSymbol}
              className="border-0 outline-0 rounded-md p-2 "
              placeholder="Search Symbol"
            />
            <button
              onClick={(e) => handleSearch(e)}
              disabled={loading || !searchSymbol.trim()}
              className="rounded-md disabled:bg-gray-500 outline-none border-none p-2 bg-sky-600 text-white hover:bg-sky-800 transition-all ease-in-out hover:shadow-md px-6"
            >
              Search For Symbol
            </button>
            {availableSymbols.length > 0 && (
              <CustomDropDown
                defaultValue={"Select Symbol"}
                options={availableSymbols.map((item) => item.title)}
                id="number01"
                emitSelectedOption={(arg) => setSymbol(arg)}
              />
            )}
            <CustomDropDown
              defaultValue={"Select Time Period"}
              options={availableTimePeriods.map((item) => item.title)}
              id="number02"
              emitSelectedOption={(arg) => handlePeriodSelect(arg)}
            />
          </div>
          <MyChart symbol={symbol} timePeriod={timePeriod} />
        </div>
      </div>}
    </Suspense>
  );
}

export default App;
