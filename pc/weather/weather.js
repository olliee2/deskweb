"use strict";
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => showWeather(position.coords.latitude, position.coords.longitude), manuallyShowWeather);
}
async function showWeather(latitude, longitude) {
    var _a, _b;
    const data = await fetchTemperature(latitude, longitude);
    console.log(data);
    if (!((_a = data === null || data === void 0 ? void 0 : data.daily) === null || _a === void 0 ? void 0 : _a.temperature_2m_max) || !((_b = data === null || data === void 0 ? void 0 : data.daily) === null || _b === void 0 ? void 0 : _b.weather_code)) {
        console.error('Insufficient weather data available');
        return;
    }
    displayWeather(data.daily.temperature_2m_max, data.daily.weather_code);
}
async function fetchTemperature(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code&timezone=auto`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok)
            throw new Error('Network response was not ok');
        return await response.json();
    }
    catch (error) {
        console.error('There has been a problem with fetching the temperature:', error);
        return null;
    }
}
function displayWeather(temperatures, weathers) {
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
        const img = document.createElement('img');
        if (weatherCode < 15) {
            img.src = '../assets/sun.svg';
        }
        else if (weatherCode < 40) {
            img.src = '../assets/cloud.svg';
        }
        else if (weatherCode < 80) {
            img.src = '../assets/rain.svg';
        }
        else {
            img.src = '../assets/storm.svg';
        }
        div.textContent = `${weekday} ${dayOfMonth}${ending}: ${temp}°C, WMO Code ${weathers[i]}`;
        div.className = 'day';
        frag.append(div);
    });
    weatherDays.replaceChildren(frag);
}
function getEnding(number) {
    if (number % 10 === 1 && number % 100 !== 11)
        return 'st';
    if (number % 10 === 2 && number % 100 !== 12)
        return 'nd';
    if (number % 10 === 3 && number % 100 !== 13)
        return 'rd';
    return 'th';
}
function manuallyShowWeather(error) {
    console.error(error);
    const weatherDays = document.getElementById('weather-days');
    if (!weatherDays)
        throw new Error('Missing weather-days');
    weatherDays.classList.add('hidden');
    const manualCoords = document.getElementById('manual-coords');
    if (!manualCoords)
        throw new Error('Missing manual-coords');
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
        }
        else {
            showWeather(Number(latitudeInput.value), Number(longitudeInput.value)).catch((e) => {
                console.error(e);
            });
        }
    });
}
