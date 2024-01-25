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
let rounds = document.getElementById('rounds');
let finishCard = document.getElementById('finishedCard');
const playagainbtn = document.getElementById('playagainbtn');
const homebtn = document.getElementById('homebtn');
let winnernameholder = document.getElementById('winname');
let winstatholder = document.getElementById('winstat');
let scorei = document.querySelector('.scorei');
let allelements = document.getElementsByTagName('body');
let scoreii = document.querySelector('.scoreii');
let winnersName = "";
let one = "", two = "", three = "", four = "", five = "", six = "", seven = "", eight = "";

// the usernames
let username = "";
let secondPlayer = "";
let firstplayerScore = 0;
let secondplayerScore = 0;
let keys = "";
let counter = 0;
let possibleWinnings;
let currentRouds = 1;

// starting the game
function GameStart() {
    logs(username);
    // setting up the board
    playagainDefaults();

    // setting up the names of players
    firstusernameHolder.innerHTML = username; // main user
    // second user
    if (returnSecondUser(whosecondplayer.value) == 1) {
        secondPlayer = whosecondplayer.value;
        playertwo.innerHTML = whosecondplayer.value;
        logs("playing with a bot, loading...");
        // with a bot
        WithBot();
    } else {
        playertwo.innerHTML = whosecondplayer.value;
        secondPlayer = whosecondplayer.value;
        logs("playing with a player, loading...");
        // with a player
        WithAPlayer();
    }

}


// playing with a bot
function WithBot() {
    logs('with bot loaded!');
    // with bot script
    BotGameMode();
}


// with another player
function WithAPlayer() {
    logs('with a player loaded!');
    GameBrain();
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

// when playing again 
playagainbtn.onclick = () => {
    counter = 0;
    currentRouds = 1;
    playagainDefaults();
    GameStart();
}

// home button clicked!
homebtn.onclick = () => {
    window.location.reload();

}

let takenSpots = [];
let botplay = false;

let hashtable = {
    'one': 0,
    'two': 1,
    'three': 2,
    'four': 3,
    'five': 4,
    'six': 5,
    'seven': 6,
    'eight': 7,
    'nine': 8
};


// keeping track of clicked tabs
function takenKeeper(element) {
    if (hashtable[element]) {
        takenSpots.push(tabs[hashtable[element]]);
    } else {
        takenSpots.push(tabs[element]);
    }
}

// cleaning the keeper
function takenKeeperCleaner() {
    // on win clear the taken table
    for (let o = 0; o < takenSpots.length; o++) {
        takenSpots.pop();
    }
}

// playing with a bot mode
function BotGameMode() {
    tabs.forEach(ElementBot => {
        ElementBot.onclick = () => {
            logs(ElementBot.classList[0]);
            // when a box is clicked then it should be marked in here
            // when clicked, change the number

            // only if the element does not have a marker
            if (ElementBot.innerHTML == "") {
                takenKeeper(ElementBot.classList[0]);
                counter++;
                if ((counter) % 2 !== 0) {
                    // the first to go
                    // same here, chage colors when their turn.
                    firstusernameHolder.style.background = " white";
                    playertwo.style.background = "lightgray";
                    ElementBot.innerHTML = "X";

                } else {
                    // the second to go
                    // change colors when their turn
                    firstusernameHolder.style.background = "lightgray";
                    playertwo.style.background = "white";
                    ElementBot.innerHTML = "O";
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

                // bot click
                botplay = true;
                level1Bot();



                // logs(possibleWinnings[1, 2, 3]);
                let nowinner = true;
                for (let i = 0; i < possibleWinnings.length; i++) {
                    if (trueOrFalse(possibleWinnings[i], "X") == true) {
                        // when X wins
                        rehighlights();
                        // score keeping
                        botplay = false;
                        firstplayerScore++;
                        scorei.innerHTML = firstplayerScore;
                        winnersName = username;


                        awinordraw();
                        logs('X won');
                        currentRouds++;
                        nowinner = false;
                    } else if (trueOrFalse(possibleWinnings[i], "O") == true) {
                        // score keeping
                        rehighlights();
                        secondplayerScore++;
                        scoreii.innerHTML = secondplayerScore;
                        winnersName = secondPlayer;

                        // when O wins
                        awinordraw();
                        botplay = false;
                        logs('O won')
                        nowinner = false;
                        currentRouds++;
                    } else if (counter == 9 && nowinner == true) {
                        logs("It's a draw");
                        awinordraw();
                        botplay = false;
                        currentRouds++;
                    }
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
        }
    });
}



function level1Bot() {
    if (botplay == true && (counter % 2) !== 0) {
        let botMove = Math.floor(Math.random() * 8);
        let thinktime = (Math.floor(Math.random() * 2)) * 1000;
        setTimeout(() => {
            if (tabs[botMove].innerHTML == "") {
                tabs[botMove].click();
                // keeping track of take spots.
                takenKeeper(botMove);

            } else {
                consoletext.innerHTML = "taken";
                consoletext.style.color = 'red';
                level1Bot();
            }

            botplay = false;
        }, thinktime);
        // to false to make the bot stop
    };
}


// playing with a friend mode
function GameBrain() {
    firstusernameHolder.style.background = " lightgray";
    tabs.forEach(Element => {
        leftBrainSide(Element);
    })
}


function leftBrainSide(Element) {
    Element.onclick = () => {
        // when a box is clicked then it should be marked in here
        // when clicked, change the number

        // only if the element does not have a marker
        if (Element.innerHTML == "") {
            counter++;
            if ((counter) % 2 !== 0) {
                // the first to go
                // same here, chage colors when their turn.
                firstusernameHolder.style.background = " white";
                playertwo.style.background = "lightgray";
                Element.innerHTML = "X";

            } else {
                // the second to go
                // change colors when their turn
                firstusernameHolder.style.background = "lightgray";
                playertwo.style.background = "white";
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
                    // when X wins
                    rehighlights();
                    // score keeping
                    firstplayerScore++;
                    scorei.innerHTML = firstplayerScore;
                    winnersName = username;

                    awinordraw();
                    logs('X won');
                    currentRouds++;
                    nowinner = false;
                } else if (trueOrFalse(possibleWinnings[i], "O") == true) {
                    // score keeping
                    rehighlights();
                    secondplayerScore++;
                    scoreii.innerHTML = secondplayerScore;
                    winnersName = secondPlayer;

                    // when O wins
                    awinordraw();
                    logs('O won')
                    nowinner = false;
                    currentRouds++;
                } else if (counter == 9 && nowinner == true) {
                    logs("It's a draw");
                    awinordraw();
                    currentRouds++;
                }
                logs('current round: ' + currentRouds);
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
    }
}

let toThisRound = 0;
function awinordraw() {
    takenKeeperCleaner();
    
    //reset counter
    counter = 0;
    nowinner = true;
    // clearning the board after a win
    for (let n = 0; n < tabs.length; n++) {
        tabs[n].innerHTML = "";
    }

    if (rounds.value == "") {
        toThisRound = 3;
    } else {
        toThisRound = rounds.value;
    }

    if (currentRouds == toThisRound) {
        // final results
        logs('game ended');
        resultsShow();
        if (winnersName == "") {
            winnersName = 'forgotten';
        }
        winnernameholder.innerHTML = winnersName + " WON!";
        winstatholder.innerHTML = `Rounds of ${toThisRound}, <br> ${winnersName} won by ${whoHasMoreWins(firstplayerScore, secondplayerScore)} out of ${whoHasLessWins(firstplayerScore, secondplayerScore)}`;

    }
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

// defualts win
function rehighlights() {
    firstusernameHolder.style.background = "lightgray";
    playertwo.style.background = "white";
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

// when showing the results
function resultsShow() {
    robby.style.display = "none";
    inGameBoard.style.display = "none";
    finishCard.style.display = "inline";
    // scores up
}

function playagainDefaults() {
    finishCard.style.display = 'none';
    robby.style.display = "none";
    inGameBoard.style.display = "block";
    firstplayerScore = 0;
    secondplayerScore = 0;
    scorei.innerHTML = 0;
    scoreii.innerHTML = 0;
}

function whoHasMoreWins(one, two) {
    return Math.max(one, two);
}

function whoHasLessWins(one, two) {
    return Math.min(one, two);
}


// short for console
function logs(mgs) {
    console.log(mgs);
}