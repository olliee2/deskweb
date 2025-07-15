if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(showWeather);
}

interface WeatherApiResponse {
  daily?: {
    temperature_2m_max?: number[];
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

async function showWeather(position: GeolocationPosition) {
  const data = await fetchWeather(position);
  if (!data?.daily?.temperature_2m_max) {
    console.error('No temperature data available');
    return;
  }
  const weatherDays = document.getElementById('weather-days');
  if (!weatherDays) throw new Error('Missing weather-days');
  displayTemperatures(data.daily.temperature_2m_max);
}

async function fetchWeather(
  position: GeolocationPosition,
): Promise<WeatherApiResponse | null> {
  const { latitude, longitude } = position.coords;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with fetching the weather:', error);
    return null;
  }
}

function displayTemperatures(temperatures: number[]) {
  const weatherDays = document.getElementById('weather-days');
  if (!weatherDays) throw new Error('Missing weather-days');

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
  for (let i = 0; i < temperatures.length; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfMonth = date.getDate();
    const ending = getEnding(dayOfMonth);
    const weekday = dayNames[date.getDay()];
    const li = document.createElement('li');
    li.textContent = `${weekday} ${dayOfMonth}${ending}: ${temperatures[i]}°C`;
    frag.append(li);
  }
  weatherDays.replaceChildren(frag);
}

function getEnding(number: number) {
  return number % 10 === 1 && number % 100 !== 11
    ? 'st'
    : number % 10 === 2 && number % 100 !== 12
      ? 'nd'
      : number % 10 === 3 && number % 100 !== 13
        ? 'rd'
        : 'th';
}
