let dim = 6;
let shiftdown = false;

function flip(button) {
    if (button.style.backgroundColor === 'black') {
        button.style.backgroundColor = 'white';
    } else {
        button.style.backgroundColor = 'black';
    }
}

function selectButton(index, board) {
    flip(board.childNodes[index]);
    if (index % dim > 0) flip(board.childNodes[index-1]);
    if (index % dim < dim-1) flip(board.childNodes[index+1]);
    if (Math.floor(index / dim) > 0) flip(board.childNodes[index-dim]);
    if (Math.floor(index / dim) < dim-1) flip(board.childNodes[index+dim]);
}

function handleButtonClick(index, board) {
    if (shiftdown) {
        flip(board.childNodes[index]);
    } else {
        selectButton(index, board);
    }
}

function empty(board) {
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
        buttons[i].style.backgroundColor = "white"
        buttons[i].style.borderColor = "black"
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleSolveClick(index, board) {
    if (index == dim**2) {
        return empty(board);
    }

    await wait(1);
    let done = await handleSolveClick(index+1, board);
    if (done) {
        return true;
    }
    selectButton(index,board);
    done = await handleSolveClick(index+1, board);
    if (done) {
        board.childNodes[index].style.borderColor = "red";
        return true;
    }
    selectButton(index,board);
    
    return false;
}

window.onkeyup = function(e) { 
    if (e.shiftKey) shiftdown = true; 
    else shiftdown = false; 
}
window.onkeydown = function(e) { 
    if (e.shiftKey) shiftdown = true;
    else shiftdown = false;
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
            handleButtonClick(i, board);
        });

        board.appendChild(button);
    }

    const solve = document.getElementById("solve");
    solve.addEventListener('click', function () {
        buttons = board.childNodes;
        for (let i = 0; i < dim**2; i++) {
            buttons[i].style.borderColor = "black";
        }
        handleSolveClick(0, board);
    });

    const clear = document.getElementById("clear");
    clear.addEventListener('click', function () {
        handleClearClick(board);
    });
});
