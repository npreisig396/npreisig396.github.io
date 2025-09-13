export default function() {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;

    const pixels = new Uint8Array(canvas.width * canvas.height);
    const next = new Uint8Array(canvas.width * canvas.height);

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < 200*200; i++) {
        pixels[i] = -1;
        data[4*i+3] = 255;
    }

    const colors = [
        [228, 26, 28],[55, 126, 184],[77, 175, 74],[255, 127, 0],
        [152, 78, 163],[166, 86, 40],[247, 129, 191],[255, 255, 51]
    ];
    let n = 4;
    let c = 50;

    function ij_to_idx(i,j) {
        return i*canvas.width+j;
    }

    function shuffle() {
        for (let i = 0; i < 7; i++) {
            const j = Math.floor((Math.random() * (8-i)) + i);
            [colors[i],colors[j]] = [colors[j],colors[i]];
        }
    }

    function voters(i,j) {
        let votes = new Uint8Array(8);
        let max = 0
        let maxc = pixels[ij_to_idx(i,j)];
        for (let k = Math.max(0,i-1); k < Math.min(200,i+2); k++) {
            for (let l = Math.max(0,j-1); l < Math.min(200,j+2); l++) {
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
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < 200; j++) {
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
        for (let i = 0; i < 200*200; i++) changed |= updatePixel(i,force);
        ctx.putImageData(imageData, 0, 0);

        if (!changed || c == 0) reset();
        else c--;
    }

    function reset() {
        c = 50;
        n = Math.floor(Math.random() * 3) + 2;
        shuffle();
        for (let i = 0; i < 200*200; i++) next[i] = Math.floor(Math.random() * n);
        update(true);
    }

    reset();

    setInterval(evolve,10);

    return canvas;
}
