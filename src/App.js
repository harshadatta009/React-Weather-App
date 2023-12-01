import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Footer from "./Footer";

const apiKey = "f56f24967aaf51182d1d4df628297c6d";
const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

const WeatherResult = ({ data }) => (
  <div className="col-md-12 text-center mt-1">
    <div className="shadow rounded weatherResultBox my-5">
      <img className="weathorIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="weather icon" />
      <h5 className="weathorCity">{data?.name}</h5>
      <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
    </div>
  </div>
);

const App = () => {
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = async (cityName) => {
    if (!cityName) return;

    try {
      const response = await axios.get(`${apiEndpoint}?q=${cityName}&appid=${apiKey}`);
      console.log("response", response.data);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <>
      <div className="container">
        <div className="col-md-12">
          <div className="weatherBg">
            <h1 className="heading text-black">Weather App</h1>

            <div className="d-grid gap-3 col-4 mt-3">
              <input
                type="text"
                className="form-control"
                value={inputCity}
                onChange={handleChangeInput}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {Object.keys(data).length > 0 && <WeatherResult data={data} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
