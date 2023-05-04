import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { Weather } from "./components/Weather";
import { Forecast } from "./components/Forecast";
import Notifications from "./components/Notifications";
import { getForecast, getWeather } from "./api/weather";

import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();
  const [forecastList, setForecastList] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      if (location?.length > 0) {
        const fetchedWeather = await getWeather(location);
        if (fetchedWeather.status === "ok") {
          setWeather(fetchedWeather.data);
        } else {
          setWeather(null);
          setError("Failed to fetch weather information");
        }
        const fetchedForecast = await getForecast(location);
        if (fetchedForecast.status === "ok") {
          setForecastList(fetchedForecast.data);
        } else {
          setForecastList([]);
          setError("Failed to fetch forecast information");
        }
      }
    };
    fetch();
  }, [location]);
  return (
    <div className="App">
      <div className="App-header">
        <h3 className="App-name">Weather Forecast</h3>
        <Search handleSearch={setLocation} />
      </div>
      <div className="App-content ">
        {weather && <Weather weather={weather} location={location} />}
        {forecastList?.length > 0 && (
          <Forecast forecastList={forecastList} location={location} />
        )}
      </div>
      {error && <Notifications error={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default App;
