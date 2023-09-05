import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import { FaChevronDown, FaMagnifyingGlass } from 'react-icons/fa6';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");

  const [customSelect, setCustomSelect] = useState({
    isActive: false,
    searchedWord: "",
    selectedCity: { id: 1, name: "Adana" },
    defaultCities: [
      { id: 1, name: "Adana" },
      { id: 2, name: "Adıyaman" },
      { id: 3, name: "Afyonkarahisar" },
      { id: 4, name: "Ağrı" },
      { id: 5, name: "Aksaray" },
      { id: 6, name: "Amasya" },
      { id: 7, name: "Ankara" },
      { id: 8, name: "Antalya" },
      { id: 9, name: "Ardahan" },
      { id: 10, name: "Artvin" },
      { id: 11, name: "Aydın" },
      { id: 12, name: "Balıkesir" },
      { id: 13, name: "Bartın" },
      { id: 14, name: "Batman" },
      { id: 15, name: "Bayburt" },
      { id: 16, name: "Bilecik" },
      { id: 17, name: "Bingöl" },
      { id: 18, name: "Bitlis" },
      { id: 19, name: "Bolu" },
      { id: 20, name: "Burdur" },
      { id: 21, name: "Bursa" },
      { id: 22, name: "Çanakkale" },
      { id: 23, name: "Çankırı" },
      { id: 24, name: "Çorum" },
      { id: 25, name: "Denizli" },
      { id: 26, name: "Diyarbakır" }, { id: 27, name: "Düzce" }, { id: 28, name: "Edirne" }, { id: 29, name: "Elazığ" }, { id: 30, name: "Erzincan" }, { id: 31, name: "Erzurum" }, { id: 32, name: "Eskişehir" }, { id: 33, name: "Gaziantep" }, { id: 34, name: "Giresun" }, { id: 35, name: "Gümüşhane" }, { id: 36, name: "Hakkari" }, { id: 37, name: "Hatay" }, { id: 38, name: "Iğdır" }, { id: 39, name: "Isparta" }, { id: 40, name: "İstanbul" }, { id: 41, name: "İzmir" }, { id: 42, name: "Kahramanmaraş" }, { id: 43, name: "Karabük" }, { id: 44, name: "Karaman" }, { id: 45, name: "Kars" }, { id: 46, name: "Kastamonu" }, { id: 47, name: "Kayseri" }, { id: 48, name: "Kilis" }, { id: 49, name: "Kırıkkale" }, { id: 50, name: "Kırklareli" }, { id: 51, name: "Kırşehir" }, { id: 52, name: "Kocaeli" }, { id: 53, name: "Konya" }, { id: 54, name: "Kütahya" }, { id: 55, name: "Malatya" }, { id: 56, name: "Manisa" }, { id: 57, name: "Mardin" }, { id: 58, name: "Mersin" }, { id: 59, name: "Muğla" }, { id: 60, name: "Muş" }, { id: 61, name: "Nevşehir" }, { id: 62, name: "Niğde" }, { id: 63, name: "Ordu" }, { id: 64, name: "Osmaniye" }, { id: 65, name: "Rize" }, { id: 66, name: "Sakarya" }, { id: 67, name: "Samsun" }, { id: 68, name: "Şanlıurfa" }, { id: 69, name: "Siirt" }, { id: 70, name: "Sinop" }, { id: 71, name: "Sivas" }, { id: 72, name: "Şırnak" }, { id: 73, name: "Tekirdağ" }, { id: 74, name: "Tokat" }, { id: 75, name: "Trabzon" }, { id: 76, name: "Tunceli" }, { id: 77, name: "Uşak" }, { id: 78, name: "Van" }, { id: 79, name: "Yalova" }, { id: 80, name: "Yozgat" }, { id: 81, name: "Zonguldak" }
    ],
    searchedCities: []
  });

  const toggleCustomSelect = (isActive) => {
    setCustomSelect({ ...customSelect, isActive: !isActive })
  }

  const handleChangeCustomSelect = (val) => {
    const filteredCities = customSelect.defaultCities.filter(city =>
      city.name.toLocaleLowerCase("tr-TR").includes(val.toLocaleLowerCase("tr-TR")))

    if (filteredCities)
      setCustomSelect({ ...customSelect, searchedWord: val, searchedCities: filteredCities })

  }

  const handleClickCustomSelect = (city, isActive) => {
    setCustomSelect({ ...customSelect, selectedCity: city, isActive: !isActive })

  }

  const getWeatherData = (cityName) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    axios.get(apiUrl)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }

  useEffect(() => {
    getWeatherData(customSelect.selectedCity.name)
  }, [customSelect.selectedCity])

  useEffect(() => {
    if (weatherData) {
      if (weatherData.weather[0].icon === "01d" || weatherData.weather[0].icon === "01n") {
        setWeatherIcon("clear.png");
      } else if (weatherData.weather[0].icon === "02d" || weatherData.weather[0].icon === "02n") {
        setWeatherIcon("cloud.png");
      } else if (weatherData.weather[0].icon === "03d" || weatherData.weather[0].icon === "03n") {
        setWeatherIcon("drizzle.png");
      } else if (weatherData.weather[0].icon === "04d" || weatherData.weather[0].icon === "04n") {
        setWeatherIcon("drizzle.png");
      } else if (weatherData.weather[0].icon === "09d" || weatherData.weather[0].icon === "09n") {
        setWeatherIcon("rain.png");
      } else if (weatherData.weather[0].icon === "10d" || weatherData.weather[0].icon === "10n") {
        setWeatherIcon("rain.png");
      } else if (weatherData.weather[0].icon === "13d" || weatherData.weather[0].icon === "13n") {
        setWeatherIcon("snow.png");
      } else {
        setWeatherIcon("clear.png");
      }
    }
  }, [weatherData])

  return (
    <div className="App">
      <div className="container">
        <div className="search">
          <div onClick={() => { toggleCustomSelect(customSelect.isActive) }} className={`choose${customSelect.isActive ? " active" : ""}`}>
            <div className='city-name'>{customSelect.selectedCity.name}</div>
            <FaChevronDown />
          </div>
          {
            customSelect.isActive && (
              <div className="list">
                <div className='group'>
                  <FaMagnifyingGlass />
                  <input onChange={(e) => { handleChangeCustomSelect(e.target.value) }} defaultValue={customSelect.searchedWord} type="text" placeholder='Şehir ara' />
                </div>
                <ul className='items'>
                  {
                    customSelect.searchedCities.length > 0 ? (
                      customSelect.searchedCities.map((city) => (
                        <li onClick={() => { handleClickCustomSelect(city, customSelect.isActive) }} key={city.id} className={city.id === customSelect.selectedCity.id ? "checked" : ""}>{city.name}</li>
                      ))
                    ) : (
                      customSelect.defaultCities.map((city) => (
                        <li onClick={() => { handleClickCustomSelect(city, customSelect.isActive) }} key={city.id} className={city.id === customSelect.selectedCity.id ? "checked" : ""}>{city.name}</li>
                      ))
                    )
                  }
                </ul>
              </div>
            )
          }
        </div>
        {
          weatherData && (
            <div className="weather-card">
              <img src={`./img/${weatherIcon}`} className='main-icon' alt="" />
              <span className='temp'>{weatherData.main.temp}°C</span>
              <span className='city-name'>{weatherData.name}</span>
              <div className='sub-info'>
                <div className="item">
                  <img src="./img/humidity.png" alt="" />
                  <div>
                    <span>{weatherData.main.humidity}%</span>
                    <span>Humidity</span>
                  </div>
                </div>
                <div className="item">
                  <img src="./img/wind.png" alt="" />
                  <div>
                    <span>{weatherData.wind.speed} km/h</span>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;