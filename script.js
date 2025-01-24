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

document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");

    for (let i = 0; i < 36; i++) {
        let button = document.createElement("button");
		button.style.backgroundColor = 'white';
        button.addEventListener('click', function () {
            handleButtonClick(i, board); // Pass the button index and button element
        });

        board.appendChild(button);
    }
    flip(board.childNodes[20]);
    flip(board.childNodes[25]);
});