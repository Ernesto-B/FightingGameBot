const { createClient } = require("redis");
require("dotenv").config()
const client = require('./redisClientFile.js');

// Dev routes:
// Viewing all user in specific server
async function getAllUsers(server:string = "testServer", setting:number = 0): Promise<void> {
    console.log(`Getting all users in ${server}`)
    const pattern = `${server}:users:*`
    try {
        // Get all keys matching the pattern and get only the username of the users
        const userKeys = await client.keys(pattern)
        const usernames = userKeys.map((key:string) => key.split(":")[2])

        if (setting == 1) {
            // Fetch JSON data for each key
            const usersData:any[] = []
            for (const userKey of userKeys) {
                const userData = await client.json.get(userKey);
                usersData.push(userData)
                // Log all retrieved JSON data
                console.log('All Users:')
                console.log(usersData)
            }
        } else {
            console.log(usernames)
        }
    } catch (error) {
        console.log("There was an error getting all users: " + error)
    } finally {
        client.quit()
    }
}
//getAllUsers("server123")

// Set up routes:
// Adding new player to DB
async function newUser(user:string, server:string = "testServer"): Promise<void> {
    console.log(`Adding new user ${user} to ${server}...`)
    const defaultUser = {
        "username": user,
        "joinDate": "05/07/2024",
        "wins": 46,
        "losses": 23,
        "winRate": 67,
        "rankedWins": 8,
        "rankedLosses": 2,
        "rankedWinRate": 80,
        "eloPoints": 46,
        "serverRanking": 7,
        "highestServerRanking": 3,
        "highestWinStreak": 2,
        "currentWinStreak": 1,
        "favoriteOpponent": "",
        "tally": {
            "cowMAN360": [10,8]
        },
        "clanMembership": ""
    }
    try {
        await client.json.set(`${server}:users:${user}`, "$", defaultUser)
        console.log(`Set information for user: ${user}`)
    } catch (error) {
        console.log("Error adding user to server: "+ error)
    }
    finally {
        client.quit()
    }
}
// newUser("Ashwin", "server123")

// PLAYER Routes:
// Get specified user's profile... not sure if void is correct or not for return type if error
async function profile(user:string, server:string = "testServer"): Promise<object|void> {
    console.log(`Searching for ${user} in ${server}...`)
    try {
        const userData = await client.json.get(`${server}:users:${user}`)
        if (!userData) {
            throw new Error("User not found")
        } else {
            console.log(userData)
            return userData
        }
    } catch (error) {
        console.log("There was an error retrieving the user's information: " + error)
    } finally {
        client.quit()
    }
}
// profile("cowMAN360", "server123")

// Log ranked match between users. user1 should be whoever calls the function by default
async function rankMatch(user1:string, user2:string, reaction:boolean, server:string = "testServer"): Promise<void> {
    console.log(`Logging ranked match for ${user1} and ${user2} in ${server}...`)
    try {
        // determine who won, add a win or loss to each user's data
        const leftWinner = reaction
        if (leftWinner) {
            // user1 won, add 1 to their win count. user2 lost, add 1 to their losses count
            console.log(`The winner is ${user1}`)

            const updatedUserInfo = await updateWinsLoss(user1, user2, true, server)

            // Make a new tally key inside both user's tally object if users' first battle. Otherwise, add 1 to the existing tally object score of the user
            const user1TallyValue = updatedUserInfo[0]["tally"][user2]
            if (!user1TallyValue) {
                // If tally doesn't exist for user2, create it
                console.log(`Tally for ${user2} in ${user1} file doesnt exist. Making new tally entry...`)
                updatedUserInfo[0]["tally"][user2] = [1, 0] // Create new tally entry
            } else {
                // If it does exist, increment user1's score in that tally
                console.log(`Tally found for ${user2} in ${user1} file. Updating changes...`)
                updatedUserInfo[0]["tally"][user2][0]++ // Increment user1's score in the tally
            }
            
            const user2TallyValue = updatedUserInfo[1]["tally"][user1];
            if (!user2TallyValue) {
                // If tally doesn't exist for user1 in user2's tally, create it
                console.log(`Tally for ${user1} in ${user2} file doesnt exist. Making new tally entry...`)
                updatedUserInfo[1]["tally"][user1] = [0, 1] // Create new tally entry
            } else {
                // If it does exist, increment user2's losses in that tally
                console.log(`Tally found for ${user1} in ${user2} file. Updating changes...`)
                updatedUserInfo[1]["tally"][user1][1]++ // Increment user2's losses in the tally
            }
            
            // Update the database with new tally values
            await client.json.set(`${server}:users:${user1}`, "$", updatedUserInfo[0])
            console.log(`Updated tally for ${user1}: ${JSON.stringify(updatedUserInfo[0].tally)}`)

            await client.json.set(`${server}:users:${user2}`, "$", updatedUserInfo[1])
            console.log(`Updated tally for ${user2}: ${JSON.stringify(updatedUserInfo[1].tally)}`)

            // elo, win rate, win streak, fav opponent changes here

        } else {
            // Same thing but other person is the winner
        
        }
    } catch (error) {
        console.log("There was an error logging the match info: " + error)
    } finally {
        client.quit()
    }
}
// rankMatch("cowMAN360", "Darth Weeder", true, "server123")


// Log match between users. user1 should be whoever calls the function by default
async function match(user1:string, user2:string, reaction:boolean, server:string = "testServer"): Promise<void> {
    console.log(`Logging match for ${user1} and ${user2} in ${server}...`)
    try {

    } catch (error) {
        console.log("" + error)
    } finally {
        client.quit()
    }
}
// match("cowMAN360", "Darth Weeder", true, "server123")


// Create player leaderboard information from server information. Sort users by elo
async function leaderboard(server:string = "testServer"): Promise<object> {
    console.log(`Creating leaderboard in ${server}...`)
    try {
        // Get all users from specific server, sort in order of elo, format and return

        return {}
    } catch (error) {
        console.log("" + error)
        return {}
    } finally {
        client.quit()
    }
}


// Get scores between two users
async function matchHistory(user1:string, user2:string, server:string = "testServer"): Promise<object|void> {
    console.log(`Getting match history for ${user1} and ${user2} in ${server}...`)
    try {
        
        const userOne = await client.json.get(`${server}:users:${user1}`)
        const userTwo = await client.json.get(`${server}:users:${user2}`)
        if(!userOne || !userTwo){
            throw new Error("User was not found in the database..")
        } 
        const matchHistory = await client.json.get(`${server}:users:${user1}`)
        const tally = matchHistory["tally"][user2]

        if(!tally){
            throw new Error("There has been no matches between these players.")
        }
        console.log(tally)
        
        // get elo here 
        return {tally}
    } catch (error) {
        console.log("There was an error retrieving the user's information: " + error)
    
    } finally {
        client.quit()
    }
}
// matchHistory("cowMAN360", "Darth Weeder", "server123")

// Helper functions:
// Function that adds and removes wins/losses or rankedWins/rankedLosses for both users
async function updateWinsLoss(winner:string, loser:string, ranked:boolean, server:string) {
    // Checking if users exist in db
    const winnerData = await client.json.get(`${server}:users:${winner}`)
    if (!winnerData) {
        throw new Error(`User ${winner} not found`)
    }
    const loserData = await client.json.get(`${server}:users:${loser}`)
    if (!loserData) {
        throw new Error(`User ${loser} not found`)
    }

    const winType = ranked === true ? "rankedWins" : "wins"
    const lossType = ranked === true ? "rankedLosses" : "losses"

    // Adding 1 to rankedWins cout and 1 to rankedLosses count for respective users
    winnerData[winType] = winnerData[winType] + 1
    await client.json.set(`${server}:users:${winner}`, "$", winnerData)
    console.log(`${winType} updated for user ${winner} in ${server} to ${JSON.stringify(winnerData.winType)}`)

    loserData[lossType] = loserData[lossType] + 1
    await client.json.set(`${server}:users:${loser}`, "$", loserData)
    console.log(`${lossType} updated for user ${loser} in ${server} to ${(JSON.stringify(loserData.lossType))}`)

    return [winnerData, loserData]
}