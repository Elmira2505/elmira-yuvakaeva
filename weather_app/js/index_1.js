if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    },
    (error) => {
      console.error(error);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

Менее -30°C: Очень холодно — тёмно-синий
-30°C до -10°C: Холодно — синий
-10°C до 0°C: Прохладно — голубой
0°C до 10°C: Немного прохладно — бирюзовый/светло-голубой
10°C до 20°C: Умеренно тепло — зелёный
20°C до 30°C: Тепло — жёлтый/оранжевый
30°C до 40°C: Жарко — тёмно-оранжевый/красный
Свыше 40°C: Очень жарко — тёмно-красный/бордовый

export const temperatureStyles = {
  celsius: [
    { min: -100, max: -20, icon: '🥶', color: '#0B1F3A', label: 'Экстремальный мороз' },
    { min: -19, max: -10, icon: '❄️', color: '#1E3A5F', label: 'Сильный мороз' },
    { min: -9, max: 0, icon: '🧊', color: '#3B82F6', label: 'Мороз' },
    { min: 1, max: 5, icon: '🌨️', color: '#60A5FA', label: 'Очень холодно' },
    { min: 6, max: 10, icon: '🌥️', color: '#7DD3FC', label: 'Холодно' },
    { min: 11, max: 15, icon: '🌤️', color: '#5EEAD4', label: 'Прохладно' },
    { min: 16, max: 20, icon: '😊', color: '#34D399', label: 'Комфортно' },
    { min: 21, max: 25, icon: '☀️', color: '#A3E635', label: 'Тепло' },
    { min: 26, max: 30, icon: '🌞', color: '#FACC15', label: 'Очень тепло' },
    { min: 31, max: 35, icon: '🔥', color: '#FB923C', label: 'Жарко' },
    { min: 36, max: 40, icon: '🥵', color: '#F97316', label: 'Очень жарко' },
    { min: 41, max: 100, icon: '☄️', color: '#DC2626', label: 'Экстремальная жара' },
  ],

  fahrenheit: [
    { min: -148, max: -4, icon: '🥶', color: '#0B1F3A', label: 'Extreme Freeze' },
    { min: -3, max: 14, icon: '❄️', color: '#1E3A5F', label: 'Severe Cold' },
    { min: 15, max: 32, icon: '🧊', color: '#3B82F6', label: 'Freezing' },
    { min: 33, max: 41, icon: '🌨️', color: '#60A5FA', label: 'Very Cold' },
    { min: 42, max: 50, icon: '🌥️', color: '#7DD3FC', label: 'Cold' },
    { min: 51, max: 59, icon: '🌤️', color: '#5EEAD4', label: 'Cool' },
    { min: 60, max: 68, icon: '😊', color: '#34D399', label: 'Comfortable' },
    { min: 69, max: 77, icon: '☀️', color: '#A3E635', label: 'Warm' },
    { min: 78, max: 86, icon: '🌞', color: '#FACC15', label: 'Very Warm' },
    { min: 87, max: 95, icon: '🔥', color: '#FB923C', label: 'Hot' },
    { min: 96, max: 104, icon: '🥵', color: '#F97316', label: 'Very Hot' },
    { min: 105, max: 212, icon: '☄️', color: '#DC2626', label: 'Extreme Heat' },
  ],
};

☀️ Ясно
0 — Clear sky
⛅ Облака
1 — Mainly clear
2 — Partly cloudy
3 — Overcast
🌫️ Туман
45, 48 — Fog / depositing rime fog
🌦️ Морось / дождь
51, 53, 55 — Drizzle (слабый → сильный)
56, 57 — Freezing drizzle
🌧️ Дождь
61, 63, 65 — Rain (слабый → сильный)
66, 67 — Freezing rain
❄️ Снег
71, 73, 75 — Snow fall
77 — Snow grains
🌧️ Ливни
80, 81, 82 — Rain showers
❄️ Снегопады
85, 86 — Snow showers
⛈️ Гроза
95 — Thunderstorm
96, 99 — Thunderstorm with hail

https://api.open-meteo.com/v1/forecast?
latitude=...&
longitude=...&
current=temperature_2m,weather_code&
temperature_unit=celsius

const tempC = data.current.temperature_2m;
const tempF = cToF(tempC);

const code = data.current.weather_code;
const weather = getWeatherStyle(code);

const card = {
  tempC,
  tempF,
  icon: weather.icon,
  background: weather.background,
};


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>weather</h2>
    <div class="container">
     <button id="weather" onclick="getWeather()"> Show Weather </button>
    
    
      </div>
    </div>
   
<h2>JavaScript Geolocation API</h2>
<p>Click the button to get your coordinates.</p>

<button onclick="getLocation()">Try It</button>

<p id="demo"></p>

<script>
const x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  getWeather(position.coords.latitude, position.coords.longitude )
}
function validateCoordinates(lat, lon) {
    if (typeof lat !== "number" || typeof lon !== "number") {
        throw new Error("Latitude and longitude must be numbers.");
    }
    if (lat < -90 || lat > 90) {
        throw new Error("Latitude must be between -90 and 90.");
    }
    if (lon < -180 || lon > 180) {
        throw new Error("Longitude must be between -180 and 180.");
    }
}
async function getWeather(lat, lon) {
    console.log(lat.lon)
    try {
        validateCoordinates(lat, lon);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather API returned an error: " + response.status);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching weather:", error.message);
        return null;
    }
}

// Example usage
(async () => {
    // Example coordinates: 40.0, -75.0 (replace with your own)
    const weather = await getWeather(40.0, -75.0);

    if (weather) {
        console.log("Current Weather:");
        console.log(weather.current_weather);

        console.log("\nNext Hours Temperature:");
        console.log(weather.hourly.temperature_2m);

    console.log("Temperature:", weather.current.temperature_2m, "°C");
    console.log("Humidity:", weather.current.relative_humidity_2m, "%");
    console.log("Wind Speed:", weather.current.wind_speed_10m, "km/h");
    }
})();

async function getWeather() {
  const latitude = 40.7128;   // New York
  const longitude = -74.0060;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Temperature:", data.current.temperature_2m, "°C");
    console.log("Humidity:", data.current.relative_humidity_2m, "%");
    console.log("Wind Speed:", data.current.wind_speed_10m, "km/h");
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

getWeather();
</script>
  </body>
</html>



Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail