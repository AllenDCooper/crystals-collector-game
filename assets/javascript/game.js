//function for generating random number between 19 and 120
function randomNum() {
    return Math.floor(Math.random()*102) + 19;
}

//array of possible jewel values
var jewelArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

//array of jewel values 
var jewelValues = []

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
    return round;
};

//function for updating round
function updateRound(gameObject, userVal) {
    gameObject.round.curPoints += userVal;
};

//function for determining if user won
function hasWon(round) {
    if (round.curPoints === round.randomNum) {
        return true;
    }
    return false;
}

//function for determining if user lost
function hasLost(round) {
    if (round.curPoints > round.randomNum) {
        return true;
    }
    return false;
}

//function for determining if end of round
function isEndOfRound(round) {
    if ((hasWon(round) === true) || ((hasLost(round) === true))) {
        return true;
    }
    return false;
}

//function for setting up a game
function setupGame() {
    var game = {
        wins: 0,
        losses: 0,
        round: setupRound(randomNum()),
    }
    return game;
}

//function for starting new round

//assigning variable game to game object, to store wins, losses, and round object

//functions for printing game object to document

//event listener for user click