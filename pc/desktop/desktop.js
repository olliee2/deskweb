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
const appIframe = document.getElementById('app');
if (!appIframe)
    throw new Error('Missing app');
const homeButton = document.getElementById('home');
if (!homeButton)
    throw new Error('Missing home');
homeButton.addEventListener('click', () => {
    appIframe.src = '../shortcuts/index.html';
});
const back = document.getElementById('back');
if (!back)
    throw new Error('Missing back');
const forward = document.getElementById('forward');
if (!forward)
    throw new Error('Missing forward');
back.addEventListener('click', () => {
    history.back();
});
forward.addEventListener('click', () => {
    history.forward();
});
function render() {
    renderTime();
    requestAnimationFrame(render);
}
render();
