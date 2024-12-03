const User = (function () {
    const setPlayer = (name, mark) => {
        let userName = name;
        let userMark = mark;
        const getName = () => userName;
        const getMark = () => userMark;
        const playerSetMove = (i) => GameBoard.setMove(i, userMark);
        return {getName, getMark, playerSetMove, };
    };

    return {setPlayer, };
})();

const GameBoard = (function (){
    const board = ["", "", "", "", "", "", "", "", ""];
    const displayBoard = () => DOMController.displayMarks(board);
    const setMove = (index, mark) => {
        board[index] = mark;
        GameBoard.displayBoard();
        GameBoard.setWinner();
    };
    const setWinner = (moves) => {
        let winningCombination = ["036", "147", "678", "012", "345", "258", "048", "246"];
        let oWin = 0;
        let xWin = 0;
        for (let i=0; i<winningCombination.length; i++) {
            let element = winningCombination[i];
            for (let j=0; j<element.length; j++) {
                let playerMark = board[parseInt(element[j])];

                if (playerMark === "O") {
                    oWin++;
                } else if (playerMark === "X") {
                    xWin++;
                }
            }

            if (oWin === 3) {
                console.log(`"O" wins!`);
                return;
            } else if (xWin === 3) {
                console.log(`"X" wins!`);
                return;
            } else if (moves === 9 && oWin < 3 && xWin < 3) {
                console.log(`draw!`);
                return;
            } else {
                oWin = 0;
                xWin = 0;
                GameBoard.displayBoard();
            }
        }
    };

    return {displayBoard, setMove, setWinner, };
})();

const EventListener = (function () {
    const selectCell = (player1, player2) => {
        let moves = 0;
        let isPlayer1 = true;
        let cell = document.querySelectorAll(".cell");
        cell.forEach((e) => {
            e.addEventListener("click", () => {
                if (isPlayer1) {
                    e.innerText = "X";
                    isPlayer1 = false;
                    moves++;
                    GameBoard.setMove(e.dataset.index, player1.getMark());
                } else {
                    e.innerText = "O";
                    isPlayer1 = true;
                    moves++;
                    GameBoard.setMove(e.dataset.index, player2.getMark());
                }

                if (moves === 9) {
                    GameBoard.setWinner(moves);
                }
            });
        });
    }

    const loadDialog = () => {
        const dialog = document.querySelector("dialog");
        window.addEventListener("load", () => {
        dialog.show();
        });
    }
    return {selectCell, loadDialog, };
})();

const DOMController = (function () {
    const displayMarks = (board) => {
        let cell = document.querySelectorAll(".cell");
        cell.forEach((e, idx) => {
            e.innerText = board[idx];
        });
    };

    return {displayMarks, }
})();

// For debugging purposes only - to be deleted after
let player1 = User.setPlayer("David", "X");
let player2 = User.setPlayer("Ruffa", "O");

EventListener.loadDialog();
EventListener.selectCell(player1, player2);
GameBoard.displayBoard();