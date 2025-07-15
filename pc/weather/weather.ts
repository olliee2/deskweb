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
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

async function showWeather(latitude: number, longitude: number) {
  const data = await fetchWeather(latitude, longitude);
  if (!data?.daily?.temperature_2m_max) {
    console.error('No temperature data available');
    return;
  }
  const weatherDays = document.getElementById('weather-days');
  if (!weatherDays) throw new Error('Missing weather-days');
  displayTemperatures(data.daily.temperature_2m_max);
}

async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherApiResponse | null> {
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
    const li = document.createElement('li');
    li.textContent = `${weekday} ${dayOfMonth}${ending}: ${temp}°C`;
    frag.append(li);
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
  if (!latitudeInput) throw new Error('Missing latitude');
  const longitudeInput = document.getElementById('longitude');
  if (!longitudeInput) throw new Error('Missing longitude');
}
