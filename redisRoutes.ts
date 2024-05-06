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
        "joinDate": "",
        "wins": 0,
        "losses": 0,
        "winRate": 0,
        "rankedWins": 0,
        "rankedLosses": 0,
        "rankedWinRate": 0,
        "eloPoints": 0,
        "serverRanking": 0,
        "highestServerRanking": 0,
        "highestWinStreak": 0,
        "currentWinStreak": 0,
        "favoriteOpponent": "",
        "tally": {

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
// newUser("cowMAN360", "server123")

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
// profile("Darth Weeder", "server123")

// Log ranked match between users. user1 should be whoever calls the function by default
async function rankMatch(user1:string, user2:string, reaction:boolean, server:string = "testServer"): Promise<void> {
    console.log(`Logging ranked match for ${user1} and ${user2} in ${server}...`)
    try {
        // determine who won, add a win or loss to each user's data
        const leftWinner = reaction
        if (leftWinner) {
            // user1 won, add 1 to their win count. user2 lost, add 1 to their losses count
            console.log(`The winner is ${user1}`)

            const winnerData = await client.json.get(`${server}:users:${user1}`)
            if (!winnerData) {
                throw new Error(`User ${user1} not found`)
            }
            winnerData["rankedWins"] = winnerData["rankedWins"] + 1
            await client.json.set(`${server}:users:${user1}`, "$", winnerData)
            console.log(`Ranked wins updated for user ${user1} in ${server} to ${winnerData}`)
            
            const loserData = await client.json.get(`${server}:users:${user2}`)
            if (!winnerData) {
                throw new Error(`User ${user2} not found`)
            }
            loserData["rankedLosses"] = loserData["rankedLosses"] + 1
            await client.json.set(`${server}:users:${user2}`, "$", loserData)
            console.log(`Ranked losses updated for user ${user2} in ${server} to ${loserData}`)

            // elo changes here

        } else {
            // Same thing but other person is the winner
            // user2 won, add 1 to their win count. user1 lost, add 1 to their losses count
            console.log(`The winner is ${user2}`)

            const winnerData = await client.json.get(`${server}:users:${user2}`)
            if (!winnerData) {
                throw new Error(`User ${user2} not found`)
            }
            winnerData["rankedWins"] = winnerData["rankedWins"] + 1
            await client.json.set(`${server}:users:${user2}`, "$", winnerData)
            console.log(`Ranked wins updated for user ${user2} in ${server} to ${winnerData}`)
            
            const loserData = await client.json.get(`${server}:users:${user1}`)
            if (!winnerData) {
                throw new Error(`User ${user1} not found`)
            }
            loserData["rankedLosses"] = loserData["rankedLosses"] + 1
            await client.json.set(`${server}:users:${user1}`, "$", loserData)
            console.log(`Ranked losses updated for user ${user1} in ${server} to ${loserData}`)

            // elo changes here

        }
        // Make a new tally entry if users' first battle. Otherwise, add 1 to the existing score of the user
        
        
    } catch (error) {
        console.log("There was an error logging the match info: " + error)
    } finally {
        client.quit()
    }
}
rankMatch("Darth Weeder", "someAvocado395", true, "server123")


// Log match between users. user1 should be whoever calls the function by default
async function match(user1:string, user2:string,server:string = "testServer"): Promise<void> {
    console.log(`Logging match for ${user1} and ${user2} in ${server}...`)
    try {
        
    } catch (error) {
        console.log("" + error)
    } finally {
        client.quit()
    }
}


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

matchHistory("someAvocado395","Darth Weeder","server123")