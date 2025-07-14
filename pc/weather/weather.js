"use strict";
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        showWeather(position);
    });
}
function showWeather(position) {
    console.log(position.coords);
    const lat = position.coords.latitude; // Temp latitude
    const lon = position.coords.longitude; // Temp longitude
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
    fetch(apiUrl)
        .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        console.log('Weather data:', data);
    })
        .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
