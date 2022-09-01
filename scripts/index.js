const OPTIONS = ["rock", "paper", "scissors"];

function computerPlay() {
    let randomComputerOption =
        Math.floor(Math.random() * 3);
    return OPTIONS[randomComputerOption];
}

function playRound(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "scissors":
            switch (computerSelection) {
                case "rock":
                    return ("You Lose! Rock beats Scissors!");
                case "paper":
                    return ("You Win! Scissors beats Paper!");
                case "scissors":
                    return ("Draw! You both picked the same!");
                default:
                    return ("Oops! Not a valid option!");
            }

        case "paper":
            switch (computerSelection) {
                case "rock":
                    return ("You Win! Paper beats Rock!");
                case "paper":
                    return ("Draw! You both picked the same!");
                case "scissors":
                    return ("You Lose! Scissors beats Paper!");
                default:
                    return ("Oops! Not a valid option!");
            }

        case "rock":
            switch (computerSelection) {
                case "rock":
                    return ("Draw! You both picked the same!");
                case "paper":
                    return ("You Lose! Paper beats Rock!");
                case "scissors":
                    return ("You Win! Rock beats Scissors!");
                default:
                    return ("Oops! Not a valid option!");
            }
        default:
            return ("Oops! Not a valid option!");
    }
}
let COMPUTER_SELECTION;
let playerSelection;
let playerScore = 0
let computerScore = 0;
let gameRounds = 0;

function playerSelectionIcon(option) {
    document.querySelector("#userChoice").value = option;
}

function round() {

    playerSelection = document.querySelector("#userChoice").value;
    playerSelection = playerSelection.toLowerCase();
    COMPUTER_SELECTION = computerPlay();
    let gameOutcome = playRound(playerSelection, COMPUTER_SELECTION);
    if (gameOutcome.includes("Win"))
        playerScore++;
    else if (gameOutcome.includes("Lose"))
        computerScore++;

    gameRounds++;
    document.querySelector("#rounds").textContent = `${gameRounds}/5`;

    setTimeout(function () {
        document.querySelector("#playerScore").textContent = `Score: ${playerScore}`;
        document.querySelector("#computerScore").textContent = `Score: ${computerScore}`;
        document.getElementById("outputMessage").style.height = "10rem";
        document.getElementById("outputMessage").textContent = playRound(playerSelection, COMPUTER_SELECTION);
    }, 2000);
    setTimeout(function () {
        document.getElementById("outputMessage").style.height = "0";
    }, 4500);
}

function game() {
    if (OPTIONS.includes(document.querySelector("#userChoice").value)) {

        let computer = document.getElementsByClassName("computerImage")[0];
        let player = document.getElementsByClassName("playerImage")[0];
        let button = document.getElementById("start");
        let counter = document.querySelector("#counter");

        if (button.innerText == 'Try Again') {
            button.textContent = 'start';
            gameRounds = 0;
            playerScore = 0;
            computerScore = 0;
        }
        //Counter Manipulation
        setTimeout(function () {
            counter.style.visibility = "visible";
        }, 250);
        setTimeout(function () {
            counter.textContent = '2';
        }, 1000);
        setTimeout(function () {
            counter.textContent = '1';
        }, 1500);
        setTimeout(function () {
            counter.textContent = 'GO!';
        }, 2000);
        setTimeout(function () {
            counter.style.visibility = "hidden";
        }, 2200);
        counter.textContent = '3';

        computer.src = `images/rock_hand.png`;
        player.src = `images/rock_hand.png`;
        computer.classList.toggle("roundStartComputer");
        player.classList.toggle("roundStartPlayer");
        button.disabled = true;
        setTimeout(function () {
            computer.classList.toggle("roundStartComputer");
            player.classList.toggle("roundStartPlayer");
            button.disabled = false;
            computer.src = `images/${COMPUTER_SELECTION}_hand.png`;
            player.src = `images/${playerSelection}_hand.png`;
        }, 2000);
        round();
        if (gameRounds >= 5) {
            button.textContent = 'Try Again';
            setTimeout(function () {
                document.getElementById("outputMessage").style.height = "10rem";
                document.getElementById("outputMessage").textContent = playerScore > computerScore ? ("You won!") : ("You lost :(");
            }, 2000);
        }
    }
    else
        alert("Please pick a valid option!");
}