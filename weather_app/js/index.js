let isDark = false;
let isCelsius = true;
let currentWeatherData = null;

let currentCity = {}

let citiesList =  JSON.parse(localStorage.getItem("cities")) || [];
let dailyForecastArr =[];



/**************** Weather  codes */
const weatherCodes = {
  0: { icon: '☀️', desc: 'Clear sky' },
  1: { icon: '🌤', desc: 'Mainly clear' },
  2: { icon: '⛅', desc: 'Partly cloudy' },
  3: { icon: '☁️', desc: 'Overcast' },
  45: { icon: '🌫', desc: 'Fog' },
  48: { icon: '🌫', desc: 'Depositing rime fog' },
  61: { icon: '🌦', desc: 'Light rain' },
  63: { icon: '🌧', desc: 'Moderate rain' },
  65: { icon: '🌧', desc: 'Heavy rain' },
  71: { icon: '🌨', desc: 'Light snow' },
  73: { icon: '❄️', desc: 'Moderate snow' },
  75: { icon: '❄️', desc: 'Heavy snow' },
  80: { icon: '🌦', desc: 'Rain showers' },
  81: { icon: '🌧', desc: 'Heavy rain showers' },
  82: { icon: '🌧', desc: 'Violent rain showers' },
  95: { icon: '⛈', desc: 'Thunderstorm' },
  96: { icon: '⛈', desc: 'Thunderstorm with hail' },
  99: { icon: '⛈', desc: 'Severe thunderstorm with hail' }
};


function toFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

/*****************  Buttons ********************/
const addBtn = document.getElementById('addBtn')
document.getElementById('themeBtn').addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark');
});

document.getElementById('unitBtn').addEventListener('click', () => {
  isCelsius = !isCelsius;
  document.getElementById('unitBtn').textContent =
  isCelsius ? "Switch to °F" : "Switch to °C";

if (currentWeatherData) {
    renderWeather(currentWeatherData, currentCity);
    
  }
});

addBtn.addEventListener('click', () => {
 console.log("city----", citiesList) 
console.log("currentCity", currentCity)
  if (citiesList.some(city => city.name === currentCity.name) ) {
 alert("Duplicat city") 
} else {
addCity(currentCity,citiesList)
  localStorage.setItem("cities", JSON.stringify(citiesList));
  addBtn.classList.add("btn-disabled");
  // 👇 ОЧИСТКА ТОЛЬКО ПОСЛЕ ВЫБОРА
      setTimeout(() => {
        input.value = "";
      }, 0); 
} 
});

/*******************. Init load **************** */
window.addEventListener("load", initApp);

async function initApp() {
    
        const position = await getLocation();

        const [data, cityName] = await Promise.all([
            getWeather(position.latitude, position.longitude),
            getCity(position.latitude, position.longitude)
        ]);
        currentCity = cityName;
        currentWeatherData = data;
       renderCities()

        renderWeather(data, cityName);
    }




/*
async function loadWeather_undefCity() {

  const position = await getLocation();

  const [data, city] = await Promise.all([
    getWeather(position.latitude, position.longitude),
    getCity(position.latitude, position.longitude)
  ]);
  currentWeatherData = data;
  currentCity = city; 
  renderWeather(data,city);
}
  */



async function loadWeather(lat,long, city) {
if (!city) {
  city = await getCity(lat, long);
}
  const data= await 
    getWeather(position.latitude, position.longitude)

currentWeatherData = data;
 currentCity = city; 
  renderWeather(data,city);
}
 


/************************ Get location ********************/

async function getLocation() {
  
    // 1. Пытаемся GPS
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject
      );
    });

    return {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };

  
}

/* 🌤 Open-Meteo API */
async function getWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=` +
      `temperature_2m,` +
      `apparent_temperature,` +
      `relative_humidity_2m,` +
      `weather_code` +
      `&hourly=temperature_2m,precipitation,precipitation_probability,weather_code`+
    `&daily=` +
      `weather_code,` +
      `temperature_2m_max,` +
      `temperature_2m_min,` +
      `precipitation_probability_max,` +
      `sunrise,` +
      `sunset,` +
      `wind_speed_10m_max` +
    `&forecast_days=14` +
    `&timezone=auto`;

  const res = await fetch(url);
  //console.log(res.json())
  return res.json();

}

/* 🎨 Render UI */
function renderWeather(data, city) {
  console.log(data,city)
  
  const tempC = data.current.temperature_2m;
  console.log("tempC : ", tempC)
  const code = data.current.weather_code;
 // const city= data.timezone
  const card = document.getElementById('weatherCard');
  const temp = isCelsius ? tempC : toFahrenheit(tempC);
  const maxTemp = data.daily.temperature_2m_max[0];
  const minTemp = data.daily.temperature_2m_min[0];

  //card.style.background = getTemperatureColor(temp);
  document.getElementById('city').textContent = `${city}`;
  document.getElementById('temp').textContent =
    `${Math.round(temp)}°${isCelsius ? "C" : "F"}`;
  document.getElementById('icon').textContent = getIcon(code);
  document.getElementById('desc').textContent = getDesc(code);
  document.getElementById('tempLH').textContent =`H: ${Math.round(maxTemp)}°${isCelsius ? "C" : "F"}/ L: ${Math.round(minTemp)}°${isCelsius ? "C" : "F"}. ` 

  getDescriptionWeather(data)
  renderHourly(data.hourly)
  renderDailyForecast(data.daily)
}

function getDescriptionWeather(data){
  console.log(data)
   const description = document.getElementById("descriptionWeather");
   const current = data.current;
  const daily = data.daily;

  const temp = current.temperature_2m;
  const feelsLike = current.apparent_temperature;
  const humidity = current.relative_humidity_2m;
  const code = current.weather_code;

  const maxTemp = daily.temperature_2m_max[0];
  const minTemp = daily.temperature_2m_min[0];
  const wind = daily.wind_speed_10m_max[0];
  const rain = daily.precipitation_probability_max[0];

  const sunrise = formatTime(daily.sunrise[0]);
  const sunset = formatTime(daily.sunset[0]);

  descriptionDay = `Today is ${getDesc(code)}. ` +
    `🌡 ${Math.round(temp)}°${isCelsius ? "C" : "F"} (feels ${Math.round(feelsLike)}°${isCelsius ? "C" : "F"}). ` +
    `🔺 High ${Math.round(maxTemp)}°${isCelsius ? "C" : "F"}, 🔻 Low ${Math.round(minTemp)}°${isCelsius ? "C" : "F"}. ` +
    `💧 Humidity ${humidity}%. ` +
    `💨 Wind ${Math.round(wind)} km/h. ` +
    `🌧 Rain chance ${rain}%. <br> ` +
    `🌅 Sunrise ${sunrise}, 🌇Sunset ${sunset}.`
  
  
  description.innerHTML = descriptionDay
  
}

function formatTime(dateStr) {
  
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}


function renderHourly(hourly) {
  const container = document.getElementById('hourlyForecast');

     const slider = document.querySelector('.hourly_weather-slider');

document.querySelector('.hourly_arrow_left').onclick = () => {
    slider.scrollBy({ left: -120, behavior: 'smooth' });
};

document.querySelector('.hourly_arrow_right').onclick = () => {
    slider.scrollBy({ left: 120, behavior: 'smooth' });
};

  const now = new Date();
  const currentHour = now.getHours();

  let html = '';

  for (let i = currentHour; i < currentHour + 24; i++) {
    const hour = hourly.time[i].slice(11, 16);

    const temp = isCelsius
      ? hourly.temperature_2m[i]
      : toFahrenheit(hourly.temperature_2m[i]);

    const code = hourly.weather_code[i];
    const rain = hourly.precipitation_probability[i];

  
      html += `
<div class="hourly_hour">
  <div class="hourly_time">${hour}</div>
  <div class="hourly_icon">${getIcon(code)}</div>
  <div class="hourly_temp">${Math.round(temp)}°</div>
  <div>${rain}%</div>
</div>
`;
    
  }

  slider.innerHTML = html;
}
function renderDailyForecast(daily) {
  const container = document.getElementById("dailyForecast");

  let html = "";

  for (let i = 0; i < 14; i++) {
    /*const date = new Date(daily.time[i]).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
     
    });
    */

    const date = new Date(daily.time[i]).toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});
    console.log(date)

    const icon = getIcon(daily.weather_code[i]);
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const rain = daily.precipitation_probability_max[i];


    html += `
      <div class="day-card">
        
    <div class="day_card_item">${date}</div>
    <div class="day_card_item">${icon}</div>
    <div class="day_card_item">Max: ${max}° / Min: ${min}°</div>
    <divclass="day_card_item">🌧 ${rain}%</divclass=>
  </div>

      </div>
    `;
  }

  container.innerHTML = html;
}

/* 🌤 Weather code mapping */
function getIcon(code) {
  return weatherCodes[code]?.icon || '🌤';
}


function getDesc(code) {
  return weatherCodes[code]?.desc || 'Unknown';
}

async function getCity(lat, lon) {
  
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
try {
  const res = await fetch(url);
  const data = await res.json();
console.log(data)
   
               return data.address.city || data.address.town || data.address.village || data.address.county;
            
} catch (error) {
                console.error("Ошибка при определении города:", error);
            }
        }
    




function getTemperatureColor(temp) {
  if (temp <= 0) return '#3B82F6';
  if (temp <= 10) return '#60A5FA';
  if (temp <= 20) return '#34D399';
  if (temp <= 30) return '#FACC15';
  return '#EF4444';
}

function hexToRgba(hex, alpha = 0.6) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getCurrentDate() {
    const now = new Date();

    return now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
}
const input = document.getElementById("cityInput");
input.addEventListener("input", choiceCity)


async function choiceCity() {

  const suggestions = document.getElementById("suggestions");
  const query = input.value.trim();

  if (query.length < 2) return;

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
  );

  const data = await response.json();
  suggestions.innerHTML = "";

  data.results?.forEach((city) => {
    const div = document.createElement("div");
    div.className = "suggestion";
    console.log('city data',city)
    //const contextCity = `${city.name},${city.admin1 ?? ""}, ${city.country}`;
    const contextCity = formatCity(city)

    div.textContent = contextCity;

    div.onclick = async () => {
      input.value = contextCity;
      currentCity = {
        name: contextCity,
        city: city.name,
        admin1: city.admin1,
        country: city.country,
        lat: city.latitude,
        long: city.longitude,
        timeZone: city.timeZone
       }
      addBtn.classList.remove("btn-disabled");
      suggestions.innerHTML = "";
     
    
      const weatherData = await getWeather(
        city.latitude,
        city.longitude
       
      );

      renderWeather(weatherData, contextCity);

      console.log(input.value);

      
    };

    suggestions.appendChild(div);
  });
}

function formatCity(city) {
  const parts = [city.name];

  if (city.admin1 && city.admin1 !== city.name) {
    parts.push(city.admin1);
  }

  if (
    city.country &&
    city.country !== city.admin1 &&
    city.country !== city.name
  ) {
    parts.push(city.country);
  }

  return parts.join(", ");
}
/********************. List sities */
/*
function loadCities() {

    const data = localStorage.getItem("cities");

    if (data) {
        citiesList = JSON.parse(data);
        renderCities();
    }
}
    */

function addCity(currentCity,citiesList) {
   citiesList.push({
    name: currentCity.name,
    admin1: currentCity.admin1,
    city: currentCity.city,
    country: currentCity.country,
    lat: currentCity.lat,
    long: currentCity.long,
    timeZone: currentCity.timeZone
  });
  localStorage.setItem("cities", JSON.stringify(citiesList));
  addBtn.classList.add("btn-disabled");
  renderCities()
  
      
}
function removeCity(index) {
    citiesList.splice(index, 1);
    saveCities();
    renderCities();
}




  
function renderCities() {
  const cardList = document.querySelector("#cityList");

  cardList.innerHTML = "";

  citiesList.forEach((city, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <div class="cityList_cityCard" >
      <div class="city-name">${city.name}</div>
      <button class="delete-btn">✖ </button>
    </div>
    `;
     
    div.querySelector(".city-name").onclick = async () => {
      const data = await getWeather(city.lat, city.long);

      currentWeatherData = data;
      currentCity = city;

      renderWeather(data, city.name);
    };

    div.querySelector(".delete-btn").onclick = (e) => {
      e.stopPropagation();

      citiesList.splice(index, 1);

      localStorage.setItem(
        "cities",
        JSON.stringify(citiesList)
      );

      renderCities();
    };

  cardList.appendChild(div);
  });
}


          
     


  

