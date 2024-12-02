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
    const displayBoard = () => console.log(board);
    const setMove = (index, mark) => {
        board[index] = mark;
    };
    const setWinner = () => {
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
            } else {
                oWin = 0;
                xWin = 0;
                GameBoard.displayBoard();
            }
        }
    };

    return {displayBoard, setMove, setWinner, };
})();

let player1 = User.setPlayer("David", "X");
let player2 = User.setPlayer("Ruffa", "O");
console.log(player1.getName());
console.log(player1.getMark());
console.log(player2.getName());
console.log(player2.getMark());
GameBoard.displayBoard();
player1.playerSetMove(0);
player2.playerSetMove(1);
GameBoard.displayBoard();
player1.playerSetMove(6);
player2.playerSetMove(7);
GameBoard.displayBoard();
player1.playerSetMove(3);
GameBoard.setWinner();