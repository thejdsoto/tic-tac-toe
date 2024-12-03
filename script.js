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
        EventListener.getPlayerNames();
        });
    }

    const getPlayerNames = () => {
        let player1 = document.querySelector(".player-one-input");
        let player2 = document.querySelector(".player-two-input");
        let submitBtn = document.querySelector("form + button");
        const dialog = document.querySelector("dialog");

        submitBtn.addEventListener("click", (e) => {
            Game.initialize(player1.value, player2.value);
            DOMController.displayPlayerName(player1.value, player2.value);
            dialog.close();
            e.preventDefault();
        });
    }

    return {selectCell, loadDialog, getPlayerNames, };
})();

const DOMController = (function () {
    const displayMarks = (board) => {
        let cell = document.querySelectorAll(".cell");
        cell.forEach((e, idx) => {
            e.innerText = board[idx];
        });
    };

    const displayPlayerName = (player1, player2) => {
        let playerOneDisplay = document.querySelector("h2.player-one");
        let playerTwoDisplay = document.querySelector("h2.player-two");

        playerOneDisplay.innerText = `X Player: ${player1}`;
        playerTwoDisplay.innerText = `O Player: ${player2}`;
    };

    return {displayMarks, displayPlayerName, }
})();

const Game = (function(){
    const initialize = (user1, user2) => {
        let player1 = User.setPlayer(user1, "X");
        let player2 = User.setPlayer(user2, "O");
        EventListener.selectCell(player1, player2);
        GameBoard.displayBoard();
    }

    const restart = () => {

    }

    return {initialize, restart, }
})();

// For debugging purposes only - to be deleted after
// let player1 = User.setPlayer("David", "X");
// let player2 = User.setPlayer("Ruffa", "O");

EventListener.loadDialog();
// EventListener.selectCell(player1, player2);
// GameBoard.displayBoard();