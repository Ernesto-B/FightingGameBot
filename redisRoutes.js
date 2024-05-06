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
// getAllUsers("server123")
// Set up routes:
// Adding new player to DB
function newUser(user_1) {
    return __awaiter(this, arguments, void 0, function* (user, server = "testServer") {
        console.log(`Adding new user ${user} to ${server}...`);
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
            "tally": {},
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
// newUser("cowMAN360", "server123")
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
// profile("Darth Weeder", "server123")
// Log ranked match between users. user1 should be whoever calls the function by default
function rankMatch(user1_1, user2_1, reaction_1) {
    return __awaiter(this, arguments, void 0, function* (user1, user2, reaction, server = "testServer") {
        console.log(`Logging ranked match for ${user1} and ${user2} in ${server}...`);
        try {
            // determine who won
            const leftWinner = reaction;
            if (leftWinner) {
                console.log(`The winner is ${user1}`);
                // get winner and add 1 to wins
                const winnerData = yield client.json.get(`${server}:users:${user1}`);
                if (!winnerData) {
                    throw new Error(`User ${user1} not found`);
                }
                // update the wins value
                winnerData["wins"] = winnerData["wins"] + 1;
                yield client.json.set(`${server}:users:${user1}`, "$", winnerData);
                console.log(`wins updated for user ${user1} in ${server} to ${winnerData}`);
                // CONTINUE HEREEEEEE
            }
            else {
            }
            // Make a new tally entry if users' first battle. Otherwise, add 1 to the existing score of the user
        }
        catch (error) {
            console.log("There was an error logging the match info: " + error);
        }
        finally {
            client.quit();
        }
    });
}
// Log match between users. user1 should be whoever calls the function by default
function match(user1_1, user2_1) {
    return __awaiter(this, arguments, void 0, function* (user1, user2, server = "testServer") {
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
