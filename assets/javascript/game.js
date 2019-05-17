//function for generating random number between 19 and 120
function randomNum() {
    return Math.floor(Math.random()*102) + 19;
};

//function for generating four random values from the jewelArr of possible values. This function also removes the random value from the jewelArr after it's generated, so that no two random values will be the same.
function getJewelValues() {
    var jewelValues = [];
    var jewelArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * jewelArr.length);
        jewelValues[i] = jewelArr[index];
        jewelArr.splice(index, 1);
    }
    return jewelValues;
}

//function for setting up a round, creating object that stores the round data.
function setupRound(num) {
    var round = {
        targetNum: num,
        jewelVals: getJewelValues(),
        curPoints: 0,
    }
    //the jewelVals then get stored in the appropriate html element for each jewel. Uses for loop for cleaner code.
    for (i = 1; i < 5; i++) {
        $("#crystal-"+ i).attr("data", round.jewelVals[(i-1)]);
    }
    //the user score, which equals 0, is printed to the page
    $("#total-score").text(round.curPoints);
    return round;
};

//function for updating round and printing updated user score to page
function updateRound(gameObject, userVal) {
    gameObject.round.curPoints += parseInt(userVal);
    $("#total-score").text(game.round.curPoints);
};

//function for determining if user won
function hasWon(round) {
    if (round.curPoints === round.targetNum) {
        return true;
    }
    return false;
};

//function for determining if user lost
function hasLost(round) {
    if (round.curPoints > round.targetNum) {
        return true;
    }
    return false;
};

//function for determining if end of round
function isEndOfRound(round) {
    if ((hasWon(round) === true) || ((hasLost(round) === true))) {
        return true;
    }
    return false;
};

//function for setting up a game
function setupGame() {
    var game = {
        wins: 0,
        losses: 0,
        round: setupRound(randomNum()),
    }
    return game;
};

//function for starting new round. Prints updated win and loss totals to the page, as well an alert that user won or lost. 
function startNewRound(game) {
    if (hasWon(game.round) === true) {
        game.wins++;
        $("#score").html("You won!<br> wins: " + game.wins + "<br> losses: " + game.losses)
    } else if (hasLost(game.round) === true) {
        game.losses++;
        $("#score").html("You lost!<br> wins: " + game.wins + "<br> losses: " + game.losses)
    }
    if (isEndOfRound(game.round) === true) {
        game.round = setupRound(randomNum());
        $("#random-num").text(game.round.targetNum)
    }
};

//calling the setupGame function and assigning it the variable game. This populates the game object, to store wins, losses, and round data.
var game = setupGame();

//functions for printing game object to document
$("#random-num").text(game.round.targetNum);
$("#score").html("wins: " + game.wins + "<br> losses: " + game.losses)

//event listeners for user click that runs the updateRound function. Uses for loop for cleaner code.
for (i = 1; i < 5; i++) {
    $("#crystal-"+i).click(function() {
        userVal = $(this).attr("data")
        updateRound(game, userVal);
        if (isEndOfRound(game.round) ===  true) {
            startNewRound(game);
        }
    });
}