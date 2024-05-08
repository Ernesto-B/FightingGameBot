// Code for elo algorithms and other settings
function regularElo(user1Elo, user2Elo) {
    user1Elo += 5;
    //if loser has 0 elo then do not remove elo 
    if (user2Elo !== 0) {
        user2Elo -= 3;
    }
    // if winner has less elo then loser then add extra elo.
    if (user1Elo < user2Elo) {
        user1Elo = user1Elo + 2;
    }
    var list = [];
    list.push(user1Elo, user2Elo);
    return (list);
}
function complexElo(user1Elo, user2Elo) {
    var k = 15;
    var probabilityResult1 = complexProbability(user1Elo, user2Elo);
    var probabilityResult2 = complexProbability(user2Elo, user1Elo);
    try {
        // if winner has less elo then loser then add extra elo.
        if (user1Elo < user2Elo) {
            user1Elo = user1Elo + 3.5;
        }
        console.log(user1Elo);
        console.log(user2Elo);
        user1Elo = user1Elo + k * (1 - probabilityResult2);
        if (user2Elo !== 0) {
            user2Elo = user2Elo + k * (0 - probabilityResult1);
        }
        console.log(user1Elo);
        console.log(user2Elo);
    }
    catch (error) {
        console.log("There has been an error calculating these numbers: " + error);
    }
    return [Math.round(user1Elo), Math.round(user2Elo)];
}
//complexElo(4,10)
//calculate user probability of winning
function complexProbability(user1Elo, user2Elo) {
    return ((1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (user1Elo - user2Elo)) / 400)));
}
module.exports = {
    complexElo: complexElo,
    regularElo: regularElo
};
