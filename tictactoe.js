// the 'state' variable keeps track of whose turn it is, toggling between
// false (Player 1 represented by a red 'X') and true (Player 2 represented by a blue 'O')
let state = false;
const playerLetter = ['X', 'O'];
const playerNumber = ['1', '2'];
const playerColor = ['#FA4010', 'dodgerblue'];

// colors to highlight the win condition or draw condition
const endgameColor = 'silver';
const drawColor = 'purple';

// an array storing the win conditions
const wins = [
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

// creates and displays the 3x3 game board
// the banner indicates whose turn it is
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
            // create new button with unique id
            let btn = document.createElement( "button");
            btn.id = "button"+((ii*3)+jj);
            btn.className = "tttbtn";
            btn.type = "button";
            // set button text to a blank space as a placeholder for the 'X's and 'O's
            btn.innerHTML = "&nbsp;";

            // add an eventListener for button clicks
            // not sure if this is the best place for it or if it should be a separate function declared below
            btn.addEventListener ('click', (e) =>
                {
                    // add a red 'X' or a blue 'O' to the selected button and disable further clicks
                    let elementId = e.target.id;
                    btn = document.getElementById(elementId);
                    btn.style.color = (state) ? playerColor[1] : playerColor[0];
                    btn.textContent = (state) ? playerLetter[1] : playerLetter[0];
                    btn.disabled = true;
                    state = !state;

                    // check if any player has met the win conditions
                    let winner = checkWinCondition();

                    // game is over if there is a winner or a draw
                    // make an announcement in the banner
                    if (winner != null) {
                        if (winner === 0) {
                            banner.innerHTML = "It's a <span style=color:" + drawColor + ";font-weight:bold>Draw</span>.  Game Over!";
                        } else {
                            banner.innerHTML = "Congratulations! <span style=color:" + playerColor[(winner - 1)] + ";font-weight:bold> Player " + winner + "</span> has won!";
                        }

                        // turn off buttons to prevent user from entering more X's and O's
                        disableAllButtons();
                        // append a 'Play Again' button below the game board
                        addRestartButton();

                    // else continue with the game, announcing whose turn it is
                    } else {
                        banner.innerText = "It is Player " + ((state) ? playerNumber[1] : playerNumber[0]) + "'s turn";
                    }
                }
            );
            row.appendChild(btn);
        }
        grid.appendChild(row);
    }
    board.appendChild(grid);
}

function checkWinCondition() {

    // create an array representing the currently selected buttons on the board with true (Player 2),
    // false (Player 1), or null (unselected button)
    let ii, jj;
    let allTaken = true;
    let boardArray = Array(9);

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
                allTaken = false; // board still has plays left
                break;
        }
    }

    let winner = null;

    // loop over the win conditions
    // if there are three matching squares in a row and they are not null, highlight the winning combo
    // save the winner in a return variable
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

    // if all the squares are taken and there is no winner, it is a stalemate, also known as a 'cat' in tic-tac-toe
    // highlight squares to make a 'C' on the board
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

    // return winner
    //   0 = Draw
    //   1 = Player 1 has won
    //   2 = Player 2 has won
    return winner;
}

// turn off hover and disable all buttons on the game board after winner or draw has been determined
function disableAllButtons() {
    let ii;

    for (ii=0; ii<9; ii++) {
        let btn = document.getElementById("button" + ii);
        btn.disabled = true;
        btn.style.pointerEvents = "none";
    }
}

// after winner or draw has been determined, add a button below the
// game board allowing the users to reset the board and play another game
function addRestartButton() {
    let restart = document.getElementById("restart");
    let btn = document.createElement( "button");
    btn.type = "button";
    btn.id = "playAgain";
    btn.style.fontSize = "20px";
    btn.innerText = "Play Again";
    btn.setAttribute("class", "w3-button w3-black")
    btn.addEventListener ('click', reloadBoard);
    restart.appendChild(btn);
}

// reload board and start a new game
function reloadBoard() {
    // remove the old board
    let div = document.getElementById("grid");
    div.parentNode.removeChild(div);

    // remove the 'Play Again' button
    div = document.getElementById("playAgain");
    div.parentNode.removeChild(div);

    // reset the state toggle
    state = false;

    // load a fresh game board
    loadBoard();
}