import Grid from './grid.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const slider = document.getElementById('mySlider');
const resetButton = document.getElementById('resetButton');
const fpsLabel = document.getElementById('fps');

canvas.width = canvas.offsetWidth/8;
canvas.height = canvas.offsetHeight/8;
ctx.imageSmoothingEnabled = false;

let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let data = imageData.data.fill(255);
let alive = new Grid();
let neighbors = new Grid();

let f = 24;
let t = performance.now();

init();
updateCanvas();
let intervalID = setInterval(update, 1000/f);

function update() {
    evolve();
    updateCanvas();
    updateFPS();
}

function updateFPS() {
    const now = performance.now();
    const delta = (now - t) / 1000;
    t = now;
    
    const fps = 1 / delta;
    fpsLabel.textContent = fpsLabel.textContent.substring(0,5) + fps.toFixed(0);
}

function evolve() {
    for (const [i,j,n] of [...neighbors]) {
        if (alive.has(i,j)) {
            if (n < 3 || n > 4) changeCell(i,j);
        } else {
            if (n == 3) changeCell(i,j);
        }
    }
}

function init() {
    alive.clear();
    neighbors.clear();
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            if (Math.floor(Math.random()*2) == 0) {
                changeCell(i,j);
            }
        }
    }
}

function changeCell(i,j) {
    let living = alive.has(i,j);
    for (let k = i-1; k < i+2; k++) {
        for (let l = j-1; l < j+2; l++) {
            changeNeighbor(k,l,living);
        }
    }
    if (living) alive.delete(i,j);
    else alive.set(i,j,true);
}

function changeNeighbor(i,j,living) {
    if (living) {
        if (neighbors.get(i,j) > 1) neighbors.set(i,j,neighbors.get(i,j)-1);
        else neighbors.delete(i,j);
    } else {
        if (neighbors.has(i,j)) neighbors.set(i,j,neighbors.get(i,j)+1);
        else neighbors.set(i,j,1);
    }
}

function updateCanvas() {
    for (let i = 0; i < canvas.height; i++) { 
        for (let j = 0; j < canvas.width; j++) {
            let idx = i*canvas.width+j;
            if (alive.has(i,j)) {
                data[4*idx] = 50;
                data[4*idx+1] = 50;
                data[4*idx+2] = 50;
            } else {
                data[4*idx] = 255;
                data[4*idx+1] = 255;
                data[4*idx+2] = 255;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function resize(h,w) {
    canvas.height = h;
    canvas.width = w
    ctx.imageSmoothingEnabled = false;

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data.fill(255);

    init();
}

resetButton.addEventListener('click', () => {
    init();
});

slider.addEventListener('input', () => {
    f = slider.value;
    clearInterval(intervalID);
    if (f > 0) intervalID = setInterval(update, 1000/f);
});

document.getElementById('zoomIn').addEventListener('click', () => {
    resize(Math.max(canvas.height-16,16),Math.max(canvas.width-16,16));
});

document.getElementById('zoomOut').addEventListener('click', () => {
    resize(canvas.height+16,canvas.width+16);
});
