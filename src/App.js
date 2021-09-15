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
  let [weatherIconJsx, setWeatherIconJsx] = useState(null);
  let [isMetric, setIsMetric] = useState(true);
  let [weatherTemp, setWeatherTemp] = useState(null);
  let [weatherDescription, setWeatherDescription] = useState(null);
  let [windSpeed, setWindSpeed] = useState(null);
  let [pressure, setPressure] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [rain, setRain] = useState(null);
  let [cityInput, setCityInput] = useState(null);
  let [weatherClassName, setWeatherClassName] = useState(null);
  useEffect(() => {
    const getWeather = () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lang=ru&q=${city}&appid=acc42b16921fdcfd55f9ef4c7742fc93${
        isMetric ? "&units=metric" : "&units=imperial"
      }`;
      fetch(url, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          //if () setWeatherIconId(data.weather[0].id);
          if (data.weather[0].description)
            setWeatherDescription(data.weather[0].description);
          if (data.main.temp) setWeatherTemp(data.main.temp.toFixed(0));
          if (data.wind.speed) setWindSpeed(data.wind.speed.toFixed(0));
          if (data.main.pressure) setPressure(data.main.pressure);
          if (data.main.humidity) setHumidity(data.main.humidity);
          if (data.rain) {
            if (data.rain["1h"])
              setRain((data.rain["1h"] * 100).toString() + "%");
          }
          if (data.weather[0].id >= 500 && data.weather[0].id <= 531)
            setWeatherClassName("rain");
          if (data.weather[0].id === 800) setWeatherClassName("sun");
          if (data.weather[0].id === 801) setWeatherClassName("partly_cloudy");
          if (data.weather[0].id >= 802 && data.weather[0].id <= 804)
            setWeatherClassName("cloud");
          if (data.weather[0].id >= 200 && data.weather[0].id <= 232)
            setWeatherClassName("storm");
        });
    };
    getWeather();
  }, [isMetric, city]);

  useEffect(() => {
    setWeatherIconJsx(
      <div className={weatherClassName + " weather__icon"}></div>
    );
    console.log("weatherClassName", weatherClassName);
  }, [weatherClassName]);

  const selectCity = cities.map((item) => <option value={item} />);
  //(<input for>)

  const handleChange = (event) => {
    setCityInput(event.target.value);
  };

  const getMyCityByIp = () => {
    const url = "https://ipinfo.io/json&lang=ru";
    fetch(url, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) console.error(data.error);
        console.log(data);
        if (data.city) {
          setCity(data.city);
          setChangeCity(false);
        }
      });
  };
  return (
    <div className="wrapper">
      <datalist id="cities_datalist">{selectCity}</datalist>
      <header className="App-header">
        <div className="city">
          {changeCity ? (
            <div className="city__name-input">
              <input onChange={handleChange} list="cities_datalist" />
              <div
                className="cities__name-ok"
                onClick={() => {
                  setCity(cityInput);
                  setChangeCity(false);
                }}
              >
                OK
              </div>
            </div>
          ) : (
            <>
              <div className="city__name">{city}</div>
              <div className="city__change">
                <div
                  onClick={() => {
                    setChangeCity(true);
                  }}
                >
                  Сменить город
                </div>
                <div onClick={getMyCityByIp} className="city__location">
                  Мое местоположение
                </div>
              </div>
            </>
          )}
        </div>
        <div className="degrees">
          <div
            className={isMetric ? "degrees_c degrees_active" : "degrees_c"}
            onClick={() => setIsMetric(true)}
          >
            <div className="center">C</div>
          </div>
          <div
            className={isMetric ? "degrees_f" : "degrees_f degrees_active"}
            onClick={() => setIsMetric(false)}
          >
            <div className="center"> F</div>
          </div>
        </div>
      </header>

      <div className="weather__mainblock">
        <div className="weather__temp-box">
          {weatherIconJsx}
          <div className="weather__temp">{weatherTemp}</div>
        </div>
        <div className="weather__description">{weatherDescription}</div>
      </div>
      <footer>
        <div key="footer__item1" id="footer__item1">
          <div className="footer__title">Ветер</div>
          <div className="footer__value">
            {windSpeed}
            {isMetric ? "м/с" : " миль/ч"}
          </div>
        </div>

        <div key="footer__item2" id="footer__item2">
          <div className="footer__title">Давление</div>
          <div className="footer__value">{pressure} мм. рт. ст.</div>
        </div>

        <div key="footer__item3" id="footer__item3">
          <div className="footer__title">Влажность</div>
          <div className="footer__value">{humidity}%</div>
        </div>

        <div key="footer__item4" id="footer__item4">
          <div className="footer__title">Вероятность дождя</div>
          <div className="footer__value">{rain}</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
