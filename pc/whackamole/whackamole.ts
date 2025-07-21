console.log('test ');

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Missing canvas');
const ctx = canvas.getContext('2d');
if (!(ctx instanceof CanvasRenderingContext2D)) throw new Error('Missing ctx');
