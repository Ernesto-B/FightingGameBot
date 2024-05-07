"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { createClient } = require("redis");
require("dotenv").config();
const client = require('./redisClientFile.js');
// Dev routes:
// Viewing all user in specific server
function getAllUsers() {
    return __awaiter(this, arguments, void 0, function* (server = "testServer", setting = 0) {
        console.log(`Getting all users in ${server}`);
        const pattern = `${server}:users:*`;
        try {
            // Get all keys matching the pattern and get only the username of the users
            const userKeys = yield client.keys(pattern);
            const usernames = userKeys.map((key) => key.split(":")[2]);
            if (setting == 1) {
                // Fetch JSON data for each key
                const usersData = [];
                for (const userKey of userKeys) {
                    const userData = yield client.json.get(userKey);
                    usersData.push(userData);
                    // Log all retrieved JSON data
                    console.log('All Users:');
                    console.log(usersData);
                }
            }
            else {
                console.log(usernames);
            }
        }
        catch (error) {
            console.log("There was an error getting all users: " + error);
        }
        finally {
            client.quit();
        }
    });
}
//getAllUsers("server123")
// Set up routes:
// Adding new player to DB
function newUser(user_1) {
    return __awaiter(this, arguments, void 0, function* (user, server = "testServer") {
        console.log(`Adding new user ${user} to ${server}...`);
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
                "cowMAN360": [10, 8]
            },
            "clanMembership": ""
        };
        try {
            yield client.json.set(`${server}:users:${user}`, "$", defaultUser);
            console.log(`Set information for user: ${user}`);
        }
        catch (error) {
            console.log("Error adding user to server: " + error);
        }
        finally {
            client.quit();
        }
    });
}
// newUser("Ashwin", "server123")
// PLAYER Routes:
// Get specified user's profile... not sure if void is correct or not for return type if error
function profile(user_1) {
    return __awaiter(this, arguments, void 0, function* (user, server = "testServer") {
        console.log(`Searching for ${user} in ${server}...`);
        try {
            const userData = yield client.json.get(`${server}:users:${user}`);
            if (!userData) {
                throw new Error("User not found");
            }
            else {
                console.log(userData);
                return userData;
            }
        }
        catch (error) {
            console.log("There was an error retrieving the user's information: " + error);
        }
        finally {
            client.quit();
        }
    });
}
// profile("cowMAN360", "server123")
// Log ranked match between users. user1 should be whoever calls the function by default
function rankMatch(user1_1, user2_1, reaction_1) {
    return __awaiter(this, arguments, void 0, function* (user1, user2, reaction, server = "testServer") {
        console.log(`Logging ranked match for ${user1} and ${user2} in ${server}...`);
        try {
            // determine who won, add a win or loss to each user's data
            const leftWinner = reaction;
            if (leftWinner) {
                // user1 won, add 1 to their win count. user2 lost, add 1 to their losses count
                console.log(`The winner is ${user1}`);
                const updatedUserInfo = yield updateWinsLoss(user1, user2, true, server);
                // Make a new tally key inside both user's tally object if users' first battle. Otherwise, add 1 to the existing tally object score of the user
                const user1TallyValue = updatedUserInfo[0]["tally"][user2];
                if (!user1TallyValue) {
                    // If tally doesn't exist for user2, create it
                    console.log(`Tally for ${user2} in ${user1} file doesnt exist. Making new tally entry...`);
                    updatedUserInfo[0]["tally"][user2] = [1, 0]; // Create new tally entry
                }
                else {
                    // If it does exist, increment user1's score in that tally
                    console.log(`Tally found for ${user2} in ${user1} file. Updating changes...`);
                    updatedUserInfo[0]["tally"][user2][0]++; // Increment user1's score in the tally
                }
                const user2TallyValue = updatedUserInfo[1]["tally"][user1];
                if (!user2TallyValue) {
                    // If tally doesn't exist for user1 in user2's tally, create it
                    console.log(`Tally for ${user1} in ${user2} file doesnt exist. Making new tally entry...`);
                    updatedUserInfo[1]["tally"][user1] = [0, 1]; // Create new tally entry
                }
                else {
                    // If it does exist, increment user2's losses in that tally
                    console.log(`Tally found for ${user1} in ${user2} file. Updating changes...`);
                    updatedUserInfo[1]["tally"][user1][1]++; // Increment user2's losses in the tally
                }
                // Update the database with new tally values
                yield client.json.set(`${server}:users:${user1}`, "$", updatedUserInfo[0]);
                console.log(`Updated tally for ${user1}: ${JSON.stringify(updatedUserInfo[0].tally)}`);
                yield client.json.set(`${server}:users:${user2}`, "$", updatedUserInfo[1]);
                console.log(`Updated tally for ${user2}: ${JSON.stringify(updatedUserInfo[1].tally)}`);
                // elo, win rate, win streak, fav opponent changes here
            }
            else {
                // Same thing but other person is the winner
                // user1 won, add 1 to their win count. user2 lost, add 1 to their losses count
                console.log(`The winner is ${user2}`);
                const updatedUserInfo = yield updateWinsLoss(user2, user1, true, server);
                // Make a new tally key inside both user's tally object if users' first battle. Otherwise, add 1 to the existing tally object score of the user
                const user2TallyValue = updatedUserInfo[0]["tally"][user1];
                if (!user2TallyValue) {
                    // If tally doesn't exist for user2, create it
                    console.log(`Tally for ${user1} in ${user2} file doesnt exist. Making new tally entry...`);
                    updatedUserInfo[0]["tally"][user1] = [1, 0]; // Create new tally entry
                }
                else {
                    // If it does exist, increment user1's score in that tally
                    console.log(`Tally found for ${user1} in ${user2} file. Updating changes...`);
                    updatedUserInfo[0]["tally"][user1][0]++; // Increment user1's score in the tally
                }
                const user1TallyValue = updatedUserInfo[1]["tally"][user2];
                if (!user1TallyValue) {
                    // If tally doesn't exist for user1 in user2's tally, create it
                    console.log(`Tally for ${user2} in ${user1} file doesnt exist. Making new tally entry...`);
                    updatedUserInfo[1]["tally"][user2] = [0, 1]; // Create new tally entry
                }
                else {
                    // If it does exist, increment user2's losses in that tally
                    console.log(`Tally found for ${user2} in ${user1} file. Updating changes...`);
                    updatedUserInfo[1]["tally"][user2][1]++; // Increment user2's losses in the tally
                }
                // Update the database with new tally values
                yield client.json.set(`${server}:users:${user2}`, "$", updatedUserInfo[0]);
                console.log(`Updated tally for ${user2}: ${JSON.stringify(updatedUserInfo[0].tally)}`);
                yield client.json.set(`${server}:users:${user1}`, "$", updatedUserInfo[1]);
                console.log(`Updated tally for ${user1}: ${JSON.stringify(updatedUserInfo[1].tally)}`);
                // elo, win rate, win streak, fav opponent changes here
            }
        }
        catch (error) {
            console.log("There was an error logging the match info: " + error);
        }
        finally {
            client.quit();
        }
    });
}
rankMatch("cowMAN360", "Darth Weeder", false, "server123");
// Log match between users. user1 should be whoever calls the function by default
function match(user1_1, user2_1, reaction_1) {
    return __awaiter(this, arguments, void 0, function* (user1, user2, reaction, server = "testServer") {
        console.log(`Logging match for ${user1} and ${user2} in ${server}...`);
        try {
        }
        catch (error) {
            console.log("" + error);
        }
        finally {
            client.quit();
        }
    });
}
// match("cowMAN360", "Darth Weeder", true, "server123")
// Create player leaderboard information from server information. Sort users by elo
function leaderboard() {
    return __awaiter(this, arguments, void 0, function* (server = "testServer") {
        console.log(`Creating leaderboard in ${server}...`);
        try {
            // Get all users from specific server, sort in order of elo, format and return
            return {};
        }
        catch (error) {
            console.log("" + error);
            return {};
        }
        finally {
            client.quit();
        }
    });
}
// Get scores between two users
function matchHistory(user1_1, user2_1) {
    return __awaiter(this, arguments, void 0, function* (user1, user2, server = "testServer") {
        console.log(`Getting match history for ${user1} and ${user2} in ${server}...`);
        try {
            const userOne = yield client.json.get(`${server}:users:${user1}`);
            const userTwo = yield client.json.get(`${server}:users:${user2}`);
            if (!userOne || !userTwo) {
                throw new Error("User was not found in the database..");
            }
            const matchHistory = yield client.json.get(`${server}:users:${user1}`);
            const tally = matchHistory["tally"][user2];
            if (!tally) {
                throw new Error("There has been no matches between these players.");
            }
            console.log(tally);
            // get elo here 
            return { tally };
        }
        catch (error) {
            console.log("There was an error retrieving the user's information: " + error);
        }
        finally {
            client.quit();
        }
    });
}
// matchHistory("cowMAN360", "Darth Weeder", "server123")
// Helper functions:
// Function that adds and removes wins/losses or rankedWins/rankedLosses for both users
function updateWinsLoss(winner, loser, ranked, server) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checking if users exist in db
        const winnerData = yield client.json.get(`${server}:users:${winner}`);
        if (!winnerData) {
            throw new Error(`User ${winner} not found`);
        }
        const loserData = yield client.json.get(`${server}:users:${loser}`);
        if (!loserData) {
            throw new Error(`User ${loser} not found`);
        }
        const winType = ranked === true ? "rankedWins" : "wins";
        const lossType = ranked === true ? "rankedLosses" : "losses";
        // Adding 1 to rankedWins cout and 1 to rankedLosses count for respective users
        winnerData[winType] = winnerData[winType] + 1;
        yield client.json.set(`${server}:users:${winner}`, "$", winnerData);
        console.log(`${winType} updated for user ${winner} in ${server} to ${JSON.stringify(winnerData.winType)}`);
        loserData[lossType] = loserData[lossType] + 1;
        yield client.json.set(`${server}:users:${loser}`, "$", loserData);
        console.log(`${lossType} updated for user ${loser} in ${server} to ${(JSON.stringify(loserData.lossType))}`);
        return [winnerData, loserData];
    });
}
function setElo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            console.log("" + error);
        }
        finally {
            client.quit();
        }
    });
}
