//function for generating random number between 19 and 120
function randomNum() {
    return Math.floor(Math.random()*102) + 19;
};

//array of possible jewel values
var jewelArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//array of jewel values 
var jewelValues = [];

//function for generating four random values from the jewelArr. This function also removes the value from the jewelArr after it's generated,so that no two random values will be the same.
function getJewelValues() {
    for (i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * jewelArr.length);
        jewelValues[i] = jewelArr[index];
        jewelArr.splice(index, 1);
    }
    return jewelValues;
}

//function for setting up a round, that creates object round that stores randomNum, array of jewelVals, curPoints
function setupRound(numTarget) {
    var round = {
        randomNum: numTarget,
        jewelVals: getJewelValues(),
        curPoints: 0,
    }
    $("#crystal-1").attr("data", round.jewelVals[0]);
    $("#crystal-2").attr("data", round.jewelVals[1]);
    $("#crystal-3").attr("data", round.jewelVals[2]);
    $("#crystal-4").attr("data", round.jewelVals[3]);
    return round;
};

//function for updating round
function updateRound(gameObject, userVal) {
    gameObject.round.curPoints += parseInt(userVal);
    $("#total-score").text(game.round.curPoints);
};

//function for determining if user won
function hasWon(round) {
    if (round.curPoints === round.randomNum) {
        return true;
    }
    return false;
};

//function for determining if user lost
function hasLost(round) {
    if (round.curPoints > round.randomNum) {
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

//function for starting new round
function startNewRound(game) {
    if (hasWon(game.round) === true) {
        game.wins++;
    } else if (hasLost(game.round) === true) {
        game.losses++;
    }
    if (isEndOfRound(game.round) === true) {
        game.round = setupRound(randomNum());
    }
};

//assigning variable game to game object, to store wins, losses, and round object
var game = setupGame();

//functions for printing game object to document

$("#random-num").text(game.round.randomNum);

//event listener for user click
var crystal1 = $("#crystal-1");
var crystal2 = $("#crystal-2");
var crystal3 = $("#crystal-3");
var crystal4 = $("#crystal-4");

$("#crystal-1").click(function() {
    userVal = $(this).attr("data")
    updateRound(game, userVal);
});

$("#crystal-2").click(function() {
    userVal = $(this).attr("data")
    updateRound(game, userVal);
});

$("#crystal-3").click(function() {
    userVal = $(this).attr("data")
    updateRound(game, userVal);
});

$("#crystal-4").click(function() {
    userVal = $(this).attr("data")
    updateRound(game, userVal);
});