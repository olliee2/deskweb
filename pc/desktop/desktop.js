"use strict";
const timeElement = document.getElementById('time');
if (!timeElement)
    throw new Error('Missing time');
function renderTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    timeElement.textContent = time;
    timeElement.dateTime = time;
}
function render() {
    renderTime();
    requestAnimationFrame(render);
}
render();
