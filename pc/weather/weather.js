"use strict";
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        showWeather(position);
    });
}
function showWeather(position) {
    fetchWeather(position).then((data) => {
        if (data && data.daily && data.daily.temperature_2m_max) {
            const weatherDays = document.getElementById('weather-days');
            if (!weatherDays)
                throw new Error('Missing weather-days');
            displayTemperatures(data.daily.temperature_2m_max);
        }
        else {
            console.error('No temperature data available');
        }
    });
}
async function fetchWeather(position) {
    const lat = position.coords.latitude; // Temp latitude
    const lon = position.coords.longitude; // Temp longitude
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (error) {
        console.error('There has been a problem with fetching the weather:', error);
        return null;
    }
}
function displayTemperatures(temperatures) {
    const weatherDays = document.getElementById('weather-days');
    const frag = document.createDocumentFragment();
    if (!weatherDays)
        throw new Error('Missing weather-days');
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
        const weekday = dayNames[date.getDay()];
        const li = document.createElement('li');
        li.textContent = `${weekday}: ${temperatures[i]}°C`;
        frag.append(li);
    }
    weatherDays.replaceChildren(frag);
}
