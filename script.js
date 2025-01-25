function flip(button) {
    if (button.style.backgroundColor === 'black') {
        button.style.backgroundColor = 'white';
    } else {
        button.style.backgroundColor = 'black';
    }
}

function handleButtonClick(index, board) {
    flip(board.childNodes[index]);
    if (index % 6 > 0) flip(board.childNodes[index-1]);
    if (index % 6 < 5) flip(board.childNodes[index+1]);
    if (Math.floor(index / 6) > 0) flip(board.childNodes[index-6]);
    if (Math.floor(index / 6) < 5) flip(board.childNodes[index+6]);
}

function empty(board) {
    buttons = board.childNodes;
    for (let i = 0; i < 36; i++) {
        if (buttons[i].style.backgroundColor === "black") {
            return false;
        }
    }
    return true;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleSolveClick(index, board) {
    if (index == 36) {
        return empty(board);
    }

    await wait(1);

    handleButtonClick(index,board);
    for (let i = index+1; i <= 36; i++) {
        let done = await handleSolveClick(i, board);
        if (done) {
            return true;
        }
    }
    handleButtonClick(index,board);
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById("board");

    for (let i = 0; i < 36; i++) {
        let button = document.createElement('button');
		button.style.backgroundColor = 'white';
        button.addEventListener('click', function () {
            handleButtonClick(i, board);
        });

        board.appendChild(button);
    }
    flip(board.childNodes[20]);
    flip(board.childNodes[25]);

    const solve = document.getElementById("solve");
    solve.addEventListener('click', function () {
        handleSolveClick(0, board);
    });
});