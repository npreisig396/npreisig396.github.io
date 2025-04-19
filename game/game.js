let dim = 50;
let playing = false;

function flip(button) {
    if (button.style.backgroundColor === 'black') {
        button.style.backgroundColor = 'white';
    } else {
        button.style.backgroundColor = 'black';
    }
}

function handleButtonClick(i, j, board) {
    flip(board.childNodes[i*dim + j]);
}

function isEmpty(board) {
    buttons = board.childNodes;
    for (let i = 0; i < dim**2; i++) {
        if (buttons[i].style.backgroundColor === "black") {
            return false;
        }
    }
    return true;
}

function handleClearClick(board) {
    buttons = board.childNodes;
    for (let i = 0; i < dim**2; i++) {
        buttons[i].style.backgroundColor = "white";
        buttons[i].style.borderColor = "black";
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getVal(i, j, board) {
    buttons = board.childNodes;
    if (i < 0 || j < 0 || i >= dim || j >= dim) {
        return 0
    } else if (buttons[(i*dim) + j].style.backgroundColor == "black") {
        return 1;
    } else {
        return 0;
    }
}

function numNeighbors(i, j, board) {
    sum = 0;
    sum += getVal(i-1,j-1,board);
    sum += getVal(i-1,j,board);
    sum += getVal(i-1,j+1,board);
    sum += getVal(i,j-1,board);
    sum += getVal(i,j+1,board);
    sum += getVal(i+1,j-1,board);
    sum += getVal(i+1,j,board);
    sum += getVal(i+1,j+1,board);
    return sum;
}

async function handlePlayClick(board) {
    if (playing) {
        playing = false;
    } else {
        playing = true;
        buttons = board.childNodes;
        while (playing) {
            const next_board = new Array(dim**2);
            for (let idx = 0; idx < dim**2; idx++) {
                let i = Math.floor(idx / dim); let j = idx % dim;
                let v = getVal(i,j,board);
                let n = numNeighbors(i, j, board);
                if (v == 0) {
                    if (n == 3) {
                        next_board[idx] = 1;
                    } else {
                        next_board[idx] = 0;
                    }
                } else {
                    if (n == 2 || n == 3) {
                        next_board[idx] = 1;
                    } else {
                        next_board[idx] = 0;
                    }
                }
            }
            for (let idx = 0; idx < dim**2; idx++) {
                if (next_board[idx] == 1) {
                    buttons[idx].style.backgroundColor = 'black';
                } else {
                    buttons[idx].style.backgroundColor = 'white';
                }
            }
            await wait(10);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById("board");

    let d = parseInt(window.location.href.substring(window.location.href.indexOf('dim=')+4));
    if (d > 0) {
        dim = d;
    }

    board.style.gridTemplateColumns = "repeat(" + dim + ", 40px)"
    board.style.gridTemplateRows = "repeat(" + dim + ", 40px)"

    for (let i = 0; i < dim**2; i++) {
        let button = document.createElement('button');
		button.style.backgroundColor = 'white';
        button.addEventListener('click', function () {
            handleButtonClick(Math.floor(i/dim), i%dim, board);
        });

        board.appendChild(button);
    }

    const play = document.getElementById("play");
    play.addEventListener('click', function () {
        buttons = board.childNodes;
        for (let i = 0; i < dim**2; i++) {
            buttons[i].style.borderColor = "black";
        }
        handlePlayClick(board);
    });

    const clear = document.getElementById("clear");
    clear.addEventListener('click', function () {
        handleClearClick(board);
    });
});
