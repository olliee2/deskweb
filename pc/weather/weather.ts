if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    showWeather(position);
  });
}

interface WeatherApiResponse {
  daily?: {
    temperature_2m_max?: number[];
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

function showWeather(position: GeolocationPosition) {
  fetchWeather(position).then((data: WeatherApiResponse | null) => {
    if (data && data.daily && data.daily.temperature_2m_max) {
      console.log('Temperatures:', data.daily.temperature_2m_max);
    } else {
      console.log('No temperature data available');
    }
  });
}

async function fetchWeather(
  position: GeolocationPosition,
): Promise<WeatherApiResponse | null> {
  console.log(position.coords);
  const lat = position.coords.latitude; // Temp latitude
  const lon = position.coords.longitude; // Temp longitude
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data1 = await response.json();
    console.log('Weather data:', data1);
    return data1;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}
