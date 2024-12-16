async function getCurrentWeather(city) {
   const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=b556dbc33ccb4713972130728241011&q=${city}&aqi=no`);
   const currentWeather = await data.json();
   console.log(currentWeather);
   return currentWeather;
}

async function getWeatherForecast(city) {
   const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b556dbc33ccb4713972130728241011&q=${city}&days=3&aqi=no&alerts=no`);
   const forecast = await data.json();
   console.log(forecast);
   return forecast;
}

const location_input = document.querySelector('.location_input');
const location_bar_button = document.querySelector('.location_bar_button');

location_bar_button.addEventListener('click', async () => {
   const city = location_input.value;

   // Получаем текущую погоду
   const currentWeatherData = await getCurrentWeather(city);

   // Извлекаем данные о погоде
   const currentWeatherIcon = `http:${currentWeatherData.current.condition.icon}`;
   const currentWeatherTemperature = `${currentWeatherData.current.temp_c}°C`;
   const currentWeatherStatus = currentWeatherData.current.condition.text;

   // Очищаем и отображаем текущую погоду
   resetWeatherApp();
   renderCurrentWeather(currentWeatherIcon, currentWeatherTemperature, currentWeatherStatus);

   // Получаем прогноз погоды
   const forecastData = await getWeatherForecast(city);
   renderForecast(forecastData.forecast.forecastday[0].hour);
});

function renderCurrentWeather(iconSrc, temperature, status) {
   const current_weather = document.querySelector('.current_weather');

   // Очищаем контейнер перед добавлением новых данных
   current_weather.innerHTML = '';

   // Создание и добавление иконки погоды
   const currentWeatherIconEl = document.createElement('img');
   currentWeatherIconEl.setAttribute('class', "current-weather_icon");
   currentWeatherIconEl.setAttribute('src', iconSrc);

   // Создание и добавление температуры
   const currentWeatherTemperatureEl = document.createElement('p');
   currentWeatherTemperatureEl.setAttribute('class', "current-weather-temperature");
   currentWeatherTemperatureEl.innerHTML = temperature;

   // Создание и добавление статуса погоды
   const currentWeatherStatusEl = document.createElement('p');
   currentWeatherStatusEl.setAttribute('class', "current-weather_status");
   currentWeatherStatusEl.innerHTML = status;

   // Добавление элементов в контейнер
   current_weather.appendChild(currentWeatherIconEl);
   current_weather.appendChild(currentWeatherTemperatureEl);
   current_weather.appendChild(currentWeatherStatusEl);
}

function createForecastElement(iconSrc, time, temperature) {
   const forecastElement = document.createElement('div');
   forecastElement.setAttribute('class', "forecast_element");

   const forecastTime = document.createElement('p');
   forecastTime.setAttribute('class', "forecast_time");
   forecastTime.innerHTML = time.slice(11); // Показываем только время без даты

   const forecastIcon = document.createElement('img');
   forecastIcon.setAttribute('class', "forecast_icon");
   forecastIcon.setAttribute('src', `http:${iconSrc}`); // Исправлено на правильный синтаксис шаблонных строк

   const forecastTemperature = document.createElement('p');
   forecastTemperature.setAttribute('class', "forecast_temperature");
   forecastTemperature.innerHTML = temperature;

   forecastElement.appendChild(forecastTime);
   forecastElement.appendChild(forecastIcon);
   forecastElement.appendChild(forecastTemperature);

   return forecastElement;
}

function renderForecast(forecast) {
   const forecastContainer = document.querySelector(".forecast");

   forecast.forEach(forecastItem => {
      const forecastElement = createForecastElement(
         forecastItem.condition.icon,
         forecastItem.time,
         forecastItem.temp_c
      );
      forecastContainer.appendChild(forecastElement);
   });
}

function resetWeatherApp() {
   const currentWeather = document.querySelector('.current_weather'); // Исправлено на правильный селектор
   currentWeather.innerHTML = '';
   const forecastContainer = document.querySelector(".forecast");
   forecastContainer.innerHTML = '';
}
