"use strict";
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        showWeather(position);
    });
}
function showWeather(position) {
    fetchWeather(position).then((data) => {
        if (data && data.daily && data.daily.temperature_2m_max) {
            console.log('Temperatures:', data.daily.temperature_2m_max);
        }
        else {
            console.log('No temperature data available');
        }
    });
}
async function fetchWeather(position) {
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
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}
