if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) =>
      showWeather(position.coords.latitude, position.coords.longitude),
    manuallyShowWeather,
  );
}

interface WeatherApiResponse {
  daily?: {
    temperature_2m_max?: number[];
    weather_code?: number[];
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

async function showWeather(latitude: number, longitude: number) {
  const data = await fetchTemperature(latitude, longitude);
  console.log(data);
  if (!data?.daily?.temperature_2m_max || !data?.daily?.weather_code) {
    console.error('Insufficient weather data available');
    return;
  }
  displayWeather(data.daily.temperature_2m_max, data.daily.weather_code);
}

async function fetchTemperature(
  latitude: number,
  longitude: number,
): Promise<WeatherApiResponse | null> {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code&timezone=auto`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(
      'There has been a problem with fetching the temperature:',
      error,
    );
    return null;
  }
}

function displayWeather(temperatures: number[], weathers: number[]) {
  const weatherDays = document.getElementById('weather-days');
  if (!(weatherDays instanceof HTMLElement))
    throw new Error('Missing weather-days');

  weatherDays.classList.remove('hidden');

  const frag = document.createDocumentFragment();
  const today = new Date();
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  temperatures.forEach((temp, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfMonth = date.getDate();
    const ending = getEnding(dayOfMonth);
    const weekday = dayNames[date.getDay()];
    const weatherCode = weathers[i];
    const div = document.createElement('div');
    div.className = 'day';
    const img = document.createElement('img');
    img.className = 'weather';
    if (weatherCode < 25) {
      img.src = '../assets/sun.svg';
      img.alt = 'Sunny';
    } else if (weatherCode < 50) {
      img.src = '../assets/cloud.svg';
      img.alt = 'Cloudy';
    } else if (weatherCode < 90) {
      img.src = '../assets/rain.svg';
      img.alt = 'Rainy';
    } else {
      img.src = '../assets/storm.svg';
      img.alt = 'Stormy';
    }
    const h2 = document.createElement('h2');
    h2.className = 'title';
    h2.textContent = `${weekday} ${dayOfMonth}${ending}`;
    const span = document.createElement('span');
    span.className = 'subtitle';
    span.textContent = `${temp}°C`;
    div.append(img, h2, span);
    frag.append(div);
  });

  weatherDays.replaceChildren(frag);
}

function getEnding(number: number) {
  if (number % 10 === 1 && number % 100 !== 11) return 'st';
  if (number % 10 === 2 && number % 100 !== 12) return 'nd';
  if (number % 10 === 3 && number % 100 !== 13) return 'rd';
  return 'th';
}

function manuallyShowWeather(error: GeolocationPositionError) {
  console.error(error);
  const weatherDays = document.getElementById('weather-days');
  if (!weatherDays) throw new Error('Missing weather-days');
  weatherDays.classList.add('hidden');

  const manualCoords = document.getElementById('manual-coords');
  if (!manualCoords) throw new Error('Missing manual-coords');
  manualCoords.classList.remove('hidden');

  const latitudeInput = document.getElementById('latitude');
  if (!(latitudeInput instanceof HTMLInputElement))
    throw new Error('Missing latitude');
  const longitudeInput = document.getElementById('longitude');
  if (!(longitudeInput instanceof HTMLInputElement))
    throw new Error('Missing longitude');
  const submitButton = document.getElementById('submit');
  if (!(submitButton instanceof HTMLButtonElement))
    throw new Error('Missing submit');
  submitButton.addEventListener('click', () => {
    const latitude = Number(latitudeInput.value);
    const longitude = Number(longitudeInput.value);
    if (!isFinite(latitude) || !isFinite(longitude)) {
      console.error('Invalid longitude or latitude');
    } else {
      showWeather(
        Number(latitudeInput.value),
        Number(longitudeInput.value),
      ).catch((e) => {
        console.error(e);
      });
    }
  });
}
