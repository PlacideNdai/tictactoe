console.log('js started!');

// getting all the variables for the game
const usernameGetter = document.getElementById('username');
const playBtn = document.getElementById('playBtn');
const robby = document.getElementById('gamerobby'); // toggle to robby and not
const inGameBoard = document.getElementById('gameongoing'); // same with this
const tabs = document.querySelectorAll('.box');
const firstusernameHolder = document.getElementById('usernameHolder');
const whosecondplayer = document.getElementById('challenger');
let errorsShow = document.getElementById("errors");
let consoletext = document.getElementById('consoletext');
let playertwo = document.getElementById('playertwo');

// the usernames
let username = "";
let secondPlayer = "";
let keys = "";
let counter = 0;

// starting the game
function GameStart() {
    logs(username);
    // setting up the board
    robby.style.display = "none";
    inGameBoard.style.display = "block";

    // setting up the names of players
    firstusernameHolder.innerHTML = username; // main user
    // second user
    if (returnSecondUser(whosecondplayer.value) == 1) {
        playertwo.innerHTML = whosecondplayer.value;
        logs("playing with a bot, loading...");
        // with a bot
        WithBot();
    } else {
        playertwo.innerHTML = whosecondplayer.value;
        logs("playing with a player, loading...");
        // with a player
        WithAPlayer();
    }

}

// playing with a player
let winningPositions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];

let userWinnerInputedCheck = [
    [valueGetter(0),valueGetter(1),valueGetter(2)],
    [valueGetter(3),valueGetter(4),valueGetter(5)],
    [valueGetter(6),valueGetter(7),valueGetter(8)],

    [valueGetter(1),valueGetter(1),valueGetter(1)],
    [valueGetter(1),valueGetter(1),valueGetter(1)],
    [valueGetter(1),valueGetter(1),valueGetter(1)],

    [valueGetter(1),valueGetter(1),valueGetter(1)],
    [valueGetter(1),valueGetter(1),valueGetter(1)],
    [valueGetter(1),valueGetter(1),valueGetter(1)],


]

function valueGetter(num) {
    return tabs[num].innerHTML;
}

function WithBot() {
    logs('with bot loaded!');
    // with bot script
    // marking
    GameBrain();
}

// with another player
function WithAPlayer() {
    logs('with a player loaded!');

}

// when play button clicked
playBtn.onclick = () => {
    if (usernameGetter.value !== "") {
        // setting username from input
        username = usernameGetter.value;

        // starting the game
        GameStart();
    } else {
        // else settings the name and use it for username
        usernameGetter.value = "Brain";
        username = usernameGetter.value;

        GameStart();
    }
}

// game ending
function endTheGame() {
    if (counter == 9) {
        GameResults();
    }
}

function GameResults() {

}

// marking when a player clicks
function GameBrain() {
    firstusernameHolder.style.background = " lightgray";
    tabs.forEach(Element => {
        Element.onclick = () => {
            // when a box is clicked then it should be marked in here
            // when clicked, change the number

            // only if the element does not have a marker
            if (Element.innerHTML == "") {
                counter++;
                if ((counter) % 2 == 0) {
                    // the first to go
                    // same here, chage colors when their turn.
                    firstusernameHolder.style.background = " lightgray";
                    playertwo.style.background = "white";
                    Element.innerHTML = "X";
                } else {
                    // the second to go
                    // change colors when their turn
                    firstusernameHolder.style.background = "white";
                    playertwo.style.background = "lightgray";
                    Element.innerHTML = "O";

                }
                // defaults
                errorsShow.innerHTML = '•‿•';
                consoletext.innerHTML = "\nUmmm!"
                consoletext.style.color = "green";
                errorsShow.style.background = "rgb(34, 207, 34)";
            } else {
                errorsShow.innerHTML = '°◠°';
                consoletext.innerHTML = "taken"
                consoletext.style.color = "red";
                errorsShow.style.background = "rgb(220, 67, 67)";
            }


            // checking elements innerHTML to check the winnings

        }

    })

}


// getting second players name
function returnSecondUser(choice) {
    switch (choice) {
        case "bot":
            return 1;

        case "friend":
            return 2;
    }

    return keys;
}


// short for console
function logs(mgs) {
    console.log(mgs);
}