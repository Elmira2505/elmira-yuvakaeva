const city = {
  name: "Kyiv",
  lat: 50.45,
  lon: 30.52
};

localStorage.setItem("city", JSON.stringify(city));
localStorage.setItem("city", "Kyiv");
/*
div.onclick = async () => {
  const selectedCity = {
    name: contextCity,
    lat: city.latitude,
    lon: city.longitude,
    timezone: city.timezone,
  };

  localStorage.setItem(
    "selectedCity",
    JSON.stringify(selectedCity)
  );


  const weatherData = await getWeather(
    city.latitude,
    city.longitude
  );

  renderWeather(weatherData, contextCity);
};

window.addEventListener("load", async () => {
  const savedCity = JSON.parse(
    localStorage.getItem("selectedCity")
  );

  if (!savedCity) return;

  input.value = savedCity.name;

  const weatherData = await getWeather(
    savedCity.lat,
    savedCity.lon
  );

  renderWeather(weatherData, savedCity.name);
});
  */
localStorage.setItem("city", "Kyiv");
localStorage.setItem("city", "London");

console.log(localStorage.getItem("city")); // London
/*
const cities = JSON.parse(localStorage.getItem("cities")) || [];

if (!cities.some(c => c.name === contextCity)) {
  cities.push({
    name: contextCity,
    lat: city.latitude,
    lon: city.longitude
  });

  localStorage.setItem("cities", JSON.stringify(cities));
}
  */
 const cities = ["Kyiv", "London", "Paris"];

localStorage.setItem("cities", JSON.stringify(cities));
const cities = JSON.parse(localStorage.getItem("cities"));
console.log(cities)
console.log(cities[0]);
/*
Объект → строка → JSON.stringify()
Строка → объект → JSON.parse()
*/
