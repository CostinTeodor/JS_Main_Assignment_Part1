const OPTIONS = ["rock", "paper", "scissors"];
// Function for computer to pick one of the options above
function computerPlay() {
    let randomComputerOption =
        Math.floor(Math.random() * 3);
    return OPTIONS[randomComputerOption];
}
// Function to compare the computer choice and player choice
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
// Declaring global variables so the option is not undefined
let computerSelection;
let playerSelection;
let playerScore = 0
let computerScore = 0;
let gameRounds = 0;
// Function to get the player choice if icons are clicked
function playerSelectionIcon(option) {
    document.querySelector("#userChoice").value = option;
}
// Function to play a full round of rock paper scissors
function round() {
    // Memorize the player and computer choices (not case sensitive)
    playerSelection = document.querySelector("#userChoice").value;
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerPlay();
    // Update player/computer score
    let gameOutcome = playRound(playerSelection, computerSelection);
    if (gameOutcome.includes("Win"))
        playerScore++;
    else if (gameOutcome.includes("Lose"))
        computerScore++;
    //  Update no. of rounds played
    gameRounds++;
    document.querySelector("#rounds").textContent = `${gameRounds}/5`;
    // Update visually player/computer score and show the outcome message
    // after the animation has been completed
    setTimeout(function () {
        document.querySelector("#playerScore").textContent = `Score: ${playerScore}`;
        document.querySelector("#computerScore").textContent = `Score: ${computerScore}`;
        document.getElementById("outputMessage").style.height = "10rem";
        document.getElementById("outputMessage").textContent = playRound(playerSelection, computerSelection);
    }, 2000);
    // Make outcome message not visible after 2.5s
    setTimeout(function () {
        document.getElementById("outputMessage").style.height = "0";
    }, 4500);
}
// Function to make the game round more visually appealing
function game() {
    // Check if the user entered a valid option
    if (OPTIONS.includes(document.querySelector("#userChoice").value)) {
        // Get the elements that are need to be animated or modified
        let computer = document.getElementsByClassName("computerImage")[0];
        let player = document.getElementsByClassName("playerImage")[0];
        let button = document.getElementById("start");
        let counter = document.querySelector("#counter");
        // Counter Manipulation
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
        // Reset current images to initial ones
        computer.src = `images/rock_hand.png`;
        player.src = `images/rock_hand.png`;
        // Toggle the animation class for player/computer
        computer.classList.toggle("roundStartComputer");
        player.classList.toggle("roundStartPlayer");
        // Disable button so the animation cannot be done multiple times
        // unless it's been finished
        button.disabled = true;
        // Toggle again the animation class so the buttone doesn't
        // need to be pressed twice for activation + reactivating button
        // + changing the player/computer image to their pick
        setTimeout(function () {
            computer.classList.toggle("roundStartComputer");
            player.classList.toggle("roundStartPlayer");
            button.disabled = false;
            computer.src = `images/${computerSelection}_hand.png`;
            player.src = `images/${playerSelection}_hand.png`;
        }, 2000);
        // Call round function so a winner for the round is decided
        round();
        // Check if the game of 5 is over
        if (gameRounds >= 5) {
            button.textContent = 'Try Again';
            setTimeout(function () {
                document.getElementById("outputMessage").style.height = "10rem";
                document.getElementById("outputMessage").textContent = playerScore > computerScore ? ("You won!") : ("You lost :(");
            }, 2000);
        }
        // Reset button text if user wants to restart the game
        if (button.textContent == 'Try Again') {
            button.textContent = 'start';
            gameRounds = 0;
            playerScore = 0;
            computerScore = 0;
        }
    }
    else
        alert("Please pick a valid option!");
}