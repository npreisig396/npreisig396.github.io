function handleButtonClick(index, button) {
    // Mark the button as filled or unfilled
    if (button.style.backgroundColor === 'black') {
        button.style.backgroundColor = 'white';
    } else {
        button.style.backgroundColor = 'black';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("sudoku-board");

    for (let i = 0; i < 81; i++) {
        let button = document.createElement("button");
		button.style.backgroundColor = 'white';
        button.addEventListener('click', function () {
            handleButtonClick(i, button); // Pass the button index and button element
        });

        board.appendChild(button);
    }
});