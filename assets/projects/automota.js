export default function() {
    const canvas = document.createElement("canvas");
    const size = 50;
    const fps = 15;

    canvas.width = size;
    canvas.height = size;


    const pixels = new Uint8Array(size*size);
    const next = new Uint8Array(size*size);

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(size,size);
    const data = imageData.data;
    for (let i = 0; i < size*size; i++) {
        pixels[i] = -1;
        data[4*i+3] = 255;
    }

    const colors = [
        [228, 26, 28],[55, 126, 184],[77, 175, 74],[255, 127, 0],
        [152, 78, 163],[166, 86, 40],[247, 129, 191],[255, 255, 51]
    ];
    const max_frames = 25;
    let c = max_frames;
    let n = 2;

    function ij_to_idx(i,j) {
        return i*canvas.width+j;
    }

    function shuffle() {
        for (let i = 0; i < colors.length-1; i++) {
            const j = Math.floor((Math.random() * (colors.length-i)) + i);
            [colors[i],colors[j]] = [colors[j],colors[i]];
        }
    }

    function voters(i,j) {
        let votes = new Uint8Array(colors.length);
        let max = 0
        let maxc = pixels[ij_to_idx(i,j)];
        for (let k = Math.max(0,i-1); k < Math.min(size,i+2); k++) {
            for (let l = Math.max(0,j-1); l < Math.min(size,j+2); l++) {
                votes[pixels[ij_to_idx(k,l)]]++;
                if (votes[pixels[ij_to_idx(k,l)]] > max) {
                    maxc = pixels[ij_to_idx(k,l)]
                    max = votes[maxc];
                }
            }
        }
        return maxc;
    }

    function evolve() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                next[ij_to_idx(i,j)] = voters(i,j);

            }
        }
        update(false);
    }

    function updatePixel(idx,force) {
        if (force && next[idx] == pixels[idx]) return false;
        pixels[idx] = next[idx];
        for (let k = 0; k < 3; k++) {
            data[4*idx+k] = colors[pixels[idx]][k];
        }
        return true;
    }

    function update(force) {
        let changed = false;
        for (let i = 0; i < size*size; i++) changed |= updatePixel(i,force);
        ctx.putImageData(imageData, 0, 0);

        if (!changed || c == 0) reset();
        else c--;
    }

    function reset() {
        c = max_frames;
        shuffle();
        for (let i = 0; i < size*size; i++) next[i] = Math.floor(Math.random() * n);
        update(true);
    }

    reset();

    setInterval(evolve,1000/fps);

    return canvas;
}
