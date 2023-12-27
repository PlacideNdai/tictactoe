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
let playtheme = new Audio('./resources/play.wav');
let one = "", two = "", three = "", four = "", five = "", six = "", seven = "", eight = "";

// the usernames
let username = "";
let secondPlayer = "";
let keys = "";
let counter = 0;
let possibleWinnings;

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


// playing with a bot
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
        playtheme.play();
        playtheme.volume = 0.3;
        // starting the game
        GameStart();
    } else {
        // else settings the name and use it for username
        usernameGetter.value = "Brain";
        username = usernameGetter.value;

        GameStart();
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
                // getting the values to check if win or draw for the game
                one = tabs[0].innerHTML;
                two = tabs[1].innerHTML;
                three = tabs[2].innerHTML;
                four = tabs[3].innerHTML;
                five = tabs[4].innerHTML;
                six = tabs[5].innerHTML;
                seven = tabs[6].innerHTML;
                eight = tabs[7].innerHTML;
                nine = tabs[8].innerHTML;


                // one print
                let OnePrint = one + two + three + four + five + six + seven + eight;
                // logs(OnePrint);

                // possible winnings
                possibleWinnings = [
                    [one, two, three],
                    [four, five, six],
                    [seven, eight, nine],

                    [one, four, seven],
                    [two, five, eight],
                    [three, six, nine],

                    [one, five, nine],
                    [three, five, seven]
                ]

                // logs(possibleWinnings[1, 2, 3]);
                let nowinner = true;
                for (let i = 0; i < possibleWinnings.length; i++) {
                    if (trueOrFalse(possibleWinnings[i], "X") == true) {
                        console.log('X wins');
                        nowinner = false;
                    } else if (trueOrFalse(possibleWinnings[i], "O") == true) {
                        console.log("O wins")
                        nowinner = false;
                    } else if (counter == 9 && nowinner == true) {
                        logs("It's a draw");
                    }
                }

                // logs(trueOrFalse(possibleWinnings[0],"X"));

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

// true of a winning row is fullfilled
function trueOrFalse(checkstatement, latter) {
    for (let i = 0; i < checkstatement.length; i++) {
        if (checkstatement[0] == latter && checkstatement[1] == latter && checkstatement[2] == latter) {
            return true;
        } else {
            return false;
        }
    }
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