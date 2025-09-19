const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth/4;
canvas.height = canvas.offsetHeight/4;
ctx.imageSmoothingEnabled = false;

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data.fill(255);
let alive = new Set();

const f = 60;

function ij_to_idx(i,j) {
    return 4*(i*canvas.width + j);
}

function init() {
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            if (Math.floor(Math.random()*3) == 0) alive.add(ij_to_idx(i,j));
        }
    }
}

function updateData() {
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            if (alive.has(ij_to_idx(i,j))) {
                data[ij_to_idx(i,j)] = 50;
                data[ij_to_idx(i,j)+1] = 50;
                data[ij_to_idx(i,j)+2] = 50;
            } else {
                data[ij_to_idx(i,j)] = 255;
                data[ij_to_idx(i,j)+1] = 255;
                data[ij_to_idx(i,j)+2] = 255;
            }
        }
    }
}

function evolve() {
    let next = new Set();
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {        
            let total = 0;
            for (let k = Math.max(i-1,0); k < Math.min(i+2,canvas.height); k++) {
                for (let l = Math.max(j-1,0); l < Math.min(j+2,canvas.width); l++) {
                    if ((i != k || j != l) && alive.has(ij_to_idx(k,l))) {
                        total++;
                    }
                }
            }
            if (alive.has(ij_to_idx(i,j))) {
                if (total == 2 || total == 3) {
                    next.add(ij_to_idx(i,j));
                }
            } else {
                if (total == 3) {
                    next.add(ij_to_idx(i,j));
                }
            }
        }
    }
    alive = next;
}

function update() {
    evolve();
    updateData();
    ctx.putImageData(imageData, 0, 0);
    console.log('updating');
}

init();
updateData();
ctx.putImageData(imageData, 0, 0);

setInterval(update, 100/f);
