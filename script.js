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
    let board = ["", "", "", "", "", "", "", "", ""];
    const displayBoard = () => DOMController.displayMarks(board);
    const setMove = (index, mark) => {
        if (board[index] !== "X" && board[index] !== "O") {
            board[index] = mark;
            GameBoard.displayBoard();
        }
    };
    const setWinner = (moves, player1, player2) => {
        let winningCombination = ["036", "147", "678", "012", "345", "258", "048", "246"];
        for (let i=0; i<winningCombination.length; i++) {
            let element = winningCombination[i];
            for (let j=0; j<element.length-2; j++) {
                let playerMarkOne = board[parseInt(element[j])];
                let playerMarkTwo = board[parseInt(element[j+1])];
                let playerMarkThree = board[parseInt(element[j+2])];
                let playerOneWins = (moves <= 9) && (playerMarkOne === "X") && (playerMarkOne === playerMarkTwo) && (playerMarkTwo === playerMarkThree);
                let playerTwoWins = (moves <= 9) && (playerMarkOne === "O") && (playerMarkOne === playerMarkTwo) && (playerMarkTwo === playerMarkThree);
                let isDraw = (moves === 9) && !playerOneWins && !playerTwoWins;

                if (playerOneWins) {
                    DOMController.displayWinner(player1);
                } else if (playerTwoWins) {
                    DOMController.displayWinner(player2);
                } else if (isDraw) {
                    DOMController.displayDraw();
                }
            }
        }
    };
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        DOMController.resetDisplay();
    }

    return {displayBoard, setMove, setWinner, resetBoard, };
})();

const EventListener = (function () {
    let moves = 0;
    const selectCell = (player1, player2) => {
        let isPlayer1 = true;
        let cell = document.querySelectorAll(".cell");
        cell.forEach((e) => {
            e.addEventListener("click", () => {
                if (isPlayer1) {
                    e.innerText = "X";
                    isPlayer1 = false;
                    moves++;
                    GameBoard.setMove(e.dataset.index, player1.getMark(), moves);
                    GameBoard.setWinner(moves, player1.getName(), player2.getName());
                } else {
                    e.innerText = "O";
                    isPlayer1 = true;
                    moves++;
                    GameBoard.setMove(e.dataset.index, player2.getMark(), moves);
                    GameBoard.setWinner(moves, player1.getName(), player2.getName());
                }
            });
        });
    }
    const loadDialog = () => {
        const dialog = document.querySelector("dialog");
        window.addEventListener("load", () => {
        dialog.showModal();
        EventListener.getPlayerNames();
        EventListener.resetBoard();
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
    const resetBoard = () => {
        const restartBtn = document.querySelector(".restart");

        restartBtn.addEventListener("click", () => {
            moves = 0;
            GameBoard.resetBoard();
        });
    };

    return {selectCell, loadDialog, getPlayerNames, resetBoard, };
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
    const displayWinner = (userName) => {
        let resultDisplay = document.querySelector("h2.result");

        resultDisplay.innerText = `Result: ${userName} wins!`;
    };
    const displayDraw = () => {
        let resultDisplay = document.querySelector("h2.result");

        resultDisplay.innerText = `Result: DRAW!`;
    };
    const resetDisplay = () => {
        let cell = document.querySelectorAll(".cell");
        cell.forEach((e) => {
            e.innerText = '';
        });
    }

    return {displayMarks, displayPlayerName, displayWinner, displayDraw, resetDisplay, }
})();

const Game = (function(){
    const initialize = (user1, user2) => {
        let player1 = User.setPlayer(user1, "X");
        let player2 = User.setPlayer(user2, "O");
        EventListener.selectCell(player1, player2);
        GameBoard.displayBoard();
    }

    return {initialize, }
})();

EventListener.loadDialog();

// Things to do:
// 1. Restart button functionality