
let state = false;
const playerLetter = ['X', 'O'];
const playerNumber = ['1', '2'];
const playerColor = ['#FA5010', 'dodgerblue'];
const endgameColor = 'silver';
const drawColor = 'rebeccapurple';

function loadBoard() {
    let banner = document.getElementById("banner");
    banner.innerText = "It is Player 1's turn";

    let board = document.getElementById("board");
    let grid = document.createElement('div');
    grid.id = "grid";
    grid.setAttribute("class", "w3-display-container w3-center w3-animate-zoom w3-gray");

    // create a 3x3 grid of buttons
    let ii;
    let jj;

    for (ii=0; ii < 3; ii++) {
        let row = document.createElement('div');

        for (jj=0; jj < 3; jj++) {
            let btn = document.createElement( "button");
            let txt = document.createTextNode("");
            btn.id = "button"+((ii*3)+jj);
            btn.className = "tttbtn";
            btn.type = "button";
            btn.innerHTML = "&nbsp;";
            btn.addEventListener ('click', (e) =>
                {
                    let elementId = e.target.id;
                    btn = document.getElementById(elementId);
                    btn.style.color = (state) ? playerColor[1] : playerColor[0];
                    btn.textContent = (state) ? playerLetter[1] : playerLetter[0];
                    btn.disabled = true;
                    state = !state;

                    // check if any player has met the win conditions
                    let winner = checkWinCondition();
                    let banner = document.getElementById("banner");

                    if (winner != null) {
                        if (winner === 0) {
                            banner.innerHTML = "It's a <span style=color:" + drawColor + ";font-weight:bold>Draw</span>.  Game Over!";
                        } else {
                            banner.innerHTML = "Congratulations! <span style=color:" + playerColor[(winner - 1)] + ";font-weight:bold> Player " + winner + "</span> has won!";
                            // banner off buttons to prevent user from entering more X's and O's
                        }
                        disableAllButtons();
                        addRestartButton();
                    } else {
                        banner.innerText = "It is Player " + ((state) ? playerNumber[1] : playerNumber[0]) + "'s turn";
                    }
                }
            );

            btn.appendChild(txt);
            row.appendChild(btn);
        }

        grid.appendChild(row);
    }
    board.appendChild(grid);
}

function checkWinCondition() {

    // create an array of win conditions
    let wins = [
    // vertical wins
        [0,1,2],
        [3,4,5],
        [6,7,8],

    //horizontal wins
        [0,3,6],
        [1,4,7],
        [2,5,8],

    // diagonal wins
        [0,4,8],
        [2,4,6],
    ];

    // represent board with true/false/null
    let ii, jj;
    let boardArray = Array(9);
    let allTaken = true;
    for (ii=0; ii<9; ii++) {
        let btn = document.getElementById("button" + ii);
        switch (btn.innerText) {
            case 'X':
                boardArray[ii] = false;
                break;
            case 'O':
                boardArray[ii] = true;
                break;
            default:
                boardArray[ii] = null;
                allTaken = false;
                break;
        }
    }

    let winner = null;

    for (jj=0; jj < wins.length; jj++) {
        if ((boardArray[ wins[jj][0] ] != null) &&
            (boardArray[ wins[jj][1] ] != null) &&
            (boardArray[ wins[jj][2] ] != null)) {
            if ((boardArray[wins[jj][0]] === boardArray[wins[jj][1]]) &&
                (boardArray[wins[jj][1]] === boardArray[wins[jj][2]])) {
                winner = (boardArray[wins[jj][0]]) ? playerNumber[1] : playerNumber[0];

                document.getElementById("button" + wins[jj][0]).style.background = endgameColor ;
                document.getElementById("button" + wins[jj][1]).style.background = endgameColor ;
                document.getElementById("button" + wins[jj][2]).style.background = endgameColor ;

                break;
            }
        }
    }

    // A stalemate is also known as a 'cat' in tic-tac-toe.
    // Highlight squares to make a 'C' on the board.
    if ((allTaken) && (winner == null)) {
        winner = 0;
        document.getElementById("button0").style.background = endgameColor ;
        document.getElementById("button1").style.background = endgameColor ;
        document.getElementById("button2").style.background = endgameColor ;
        document.getElementById("button3").style.background = endgameColor ;
        document.getElementById("button6").style.background = endgameColor ;
        document.getElementById("button7").style.background = endgameColor ;
        document.getElementById("button8").style.background = endgameColor ;
    }

    return winner;
}

function disableAllButtons() {
    let ii;

    for (ii=0; ii<9; ii++) {
        let btn = document.getElementById("button" + ii);
        btn.disabled = true;
        btn.style.pointerEvents = "none";
    }
}

function addRestartButton() {
    let restart = document.getElementById("restart");
    let btn = document.createElement( "button");
    let txt = document.createTextNode("Play Again");
    btn.type = "button";
    btn.id = "playAgain";
    btn.setAttribute("class", "w3-button w3-black")
    btn.addEventListener ('click', reloadBoard);
    btn.appendChild(txt);
    restart.appendChild(btn);
}

function reloadBoard() {
    let div = document.getElementById("grid");
    div.parentNode.removeChild(div);

    div = document.getElementById("playAgain");
    div.parentNode.removeChild(div);

    state = false;
    loadBoard();
}