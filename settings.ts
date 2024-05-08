// Code for elo algorithms and other settings
function regularElo(user1Elo:number, user2Elo:number):number[]{
user1Elo += 2
user2Elo -= 1
const list = []
list.push(user1Elo,user2Elo)
return(list)
}

function complexElo(user1Elo:number,user2Elo:number):number[]{
//If user is higher elo than you, 
const k = 15;
const probabilityResult1 = complexProbability(user1Elo,user2Elo)
const probabilityResult2 = complexProbability(user2Elo,user1Elo)

try {
    if(user1Elo!==0){
        user1Elo=user1Elo+k*(1-probabilityResult2)
    }
    
    if(user2Elo!==0){
        user2Elo=user2Elo+k*(0-probabilityResult1)

    }
    console.log(user1Elo)
    console.log(user2Elo)

     // need to create a clause that checks if user1Elo > user2Elo and add extra elo in that case. 

} catch (error) {
    console.log("There has been an error calculating these numbers: "+error)
}
    return [user1Elo,user2Elo]
}

//calculate user probability of winning
function complexProbability(user1Elo:number, user2Elo:number){
return ((1.0*1.0) / (1+1.0* Math.pow(10,(1.0*(user1Elo-user2Elo)) /400)))
}

module.exports=complexElo

