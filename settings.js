// Code for elo algorithms and other settings
function regularElo(user1Elo, user2Elo) {
    user1Elo += 2;
    user2Elo -= 1;
    var list = [];
    list.push(user1Elo, user2Elo);
    return (list);
}
function complexElo(user1Elo, user2Elo) {
    //If user is higher elo than you, 
    var k = 30;
    var probabilityResult1 = complexProbability(user1Elo, user2Elo);
    var probabilityResult2 = complexProbability(user2Elo, user1Elo);
    try {
        user1Elo = user1Elo + k * (1 - probabilityResult2);
        user2Elo = user2Elo + k * (0 - probabilityResult1);
        console.log(user1Elo);
        console.log(user2Elo);
    }
    catch (error) {
        console.log("There has been an error calculating these numbers: " + error);
    }
    return [2, 2];
}
complexElo(50, 100);
//calculate user probability of winning
function complexProbability(user1Elo, user2Elo) {
    return ((1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (user1Elo - user2Elo)) / 400)));
}
