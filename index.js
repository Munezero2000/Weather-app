let apikey = "10076bdac1624aed8a8110016230809";
let city = "kigali";

// A function to fetch data from wheather api
const getWeatherData = async (apikey, city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city.toLowerCase()}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Unable to fetch data");
  }
};
// Getting City
document.querySelector("#search").addEventListener("input", (e) => {
  city = e.target.value;
  getData(city);
});

const getData = async (city) => {
  const data = await getWeatherData(apikey, city);
  console.log(data);
  render(data);
};

// calling the get data funciton
getData(city);

function render(data) {
  document.querySelector("#condition-text").textContent =
    data.current.condition.text;
  document
    .querySelector("#condition-icon")
    .setAttribute("src", `${data.current.condition.icon}`);
  document.querySelector(
    "#location"
  ).textContent = `${data.location.name} / ${data.location.country}`;

  document.querySelector("#temp").innerHTML = `${data.current.temp_c}&degC`;
  document.querySelector(
    "#humidity"
  ).textContent = `Humidity: ${data.current.humidity}`;
  document.querySelector(
    "#wind"
  ).textContent = `Wind Speed: ${data.current.wind_mph} kpm`;
}
