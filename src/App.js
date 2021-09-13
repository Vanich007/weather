import { useState, useEffect } from "react";
import "./App.css";
const cities = [
  "Москва",
  "Хабаровск",
  "Петрозаводск",
  "Санкт-Петербург",
  "Омск",
  "Краснодар",
];

function App() {
  let [city, setCity] = useState("Москва");
  let [changeCity, setChangeCity] = useState(false);
  let [weatherIcon, setWeatherIcon] = useState(null);
  let [isMetric, setIsMetric] = useState(true);
  let [weatherTemp, setWeatherTemp] = useState(null);
  let [weatherDescription, setWeatherDescription] = useState(null);
  let [windSpeed, setWindSpeed] = useState(null);
  let [pressure, setPressure] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [rain, setRain] = useState(null);
  useEffect(() => {
    const getWeather = () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lang=ru&id=1496747&appid=acc42b16921fdcfd55f9ef4c7742fc93${
        isMetric ? "&units=imperial" : "&units=metric"
      }`;
      fetch(url, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          if (data.weather[0].icon) setWeatherIcon(data.weather[0].icon);
          if (data.weather[0].description)
            setWeatherDescription(data.weather[0].description);
          if (data.main.temp) setWeatherTemp(data.main.temp.toFixed(0));
          if (data.wind.speed) setWindSpeed(data.wind.speed);
          if (data.main.pressure) setPressure(data.main.pressure);
          if (data.main.humidity) setHumidity(data.main.humidity);
          if (data.rain) setRain(data.rain);
        });
    };
    getWeather();
  }, [isMetric]);
  const selectCity = cities.map((item) => <option value={item} />);
  //(<input for>)
  return (
    <div className="wrapper">
      <datalist id="cities_datalist">{selectCity}</datalist>
      <header className="App-header">
        {changeCity ? (
          <div className="city__name-input">
            <input list="cities_datalist" />
          </div>
        ) : (
          <div
            className="city__name"
            onClick={() => {
              setCity(true);
              setChangeCity(true);
            }}
          >
            {city}
          </div>
        )}
        <div className="degrees">
          <div
            className="degrees_c " //{isMetric?degrees_active:null}
            onClick={() => setIsMetric(true)}
          >
            C
          </div>
          <div className="degrees_f" onClick={() => setIsMetric(false)}>
            F
          </div>
        </div>
      </header>

      <div className="weather__mainblock">
        <div className="weather__temp-box">
          <img
            alt="weatherIcon"
            src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
          />
          <div className="weather__temp">{weatherTemp}</div>
        </div>
        <div className="weather__description">{weatherDescription}</div>
      </div>
      <footer>
        <div className="footer__item">
          <div className="footer__title">Ветер</div>
          <div className="footer__value">{windSpeed}</div>
        </div>

        <div className="footer__item">
          <div className="footer__title">Давление</div>
          <div className="footer__value">{pressure}</div>
        </div>

        <div className="footer__item">
          <div className="footer__title">Влажность</div>
          <div className="footer__value">{humidity}</div>
        </div>

        <div className="footer__item">
          <div className="footer__title">Вероятность дождя</div>
          <div className="footer__value">{rain}</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
