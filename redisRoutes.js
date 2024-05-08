var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var createClient = require("redis").createClient;
require("dotenv").config();
var client = require('./redisClientFile.js');
// Dev routes:
// Viewing all user in specific server
function getAllUsers() {
    return __awaiter(this, arguments, void 0, function (server, setting) {
        var pattern, userKeys, usernames, usersData, _i, userKeys_1, userKey, userData, error_1;
        if (server === void 0) { server = "testServer"; }
        if (setting === void 0) { setting = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Getting all users in ".concat(server));
                    pattern = "".concat(server, ":users:*");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, 10, 11]);
                    return [4 /*yield*/, client.keys(pattern)];
                case 2:
                    userKeys = _a.sent();
                    usernames = userKeys.map(function (key) { return key.split(":")[2]; });
                    if (!(setting == 1)) return [3 /*break*/, 7];
                    usersData = [];
                    _i = 0, userKeys_1 = userKeys;
                    _a.label = 3;
                case 3:
                    if (!(_i < userKeys_1.length)) return [3 /*break*/, 6];
                    userKey = userKeys_1[_i];
                    return [4 /*yield*/, client.json.get(userKey)];
                case 4:
                    userData = _a.sent();
                    usersData.push(userData);
                    // Log all retrieved JSON data
                    console.log('All Users:');
                    console.log(usersData);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.log(usernames);
                    _a.label = 8;
                case 8: return [3 /*break*/, 11];
                case 9:
                    error_1 = _a.sent();
                    console.log("There was an error getting all users: " + error_1);
                    return [3 /*break*/, 11];
                case 10:
                    client.quit();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
//getAllUsers("server123")
// Set up routes:
// Adding new player to DB
function newUser(user_1) {
    return __awaiter(this, arguments, void 0, function (user, server) {
        var defaultUser, error_2;
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Adding new user ".concat(user, " to ").concat(server, "..."));
                    defaultUser = {
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(user), "$", defaultUser)];
                case 2:
                    _a.sent();
                    console.log("Set information for user: ".concat(user));
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.log("Error adding user to server: " + error_2);
                    return [3 /*break*/, 5];
                case 4:
                    client.quit();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// newUser("Ashwin", "server123")
// PLAYER Routes:
// Get specified user's profile... not sure if void is correct or not for return type if error
function profile(user_1) {
    return __awaiter(this, arguments, void 0, function (user, server) {
        var userData, error_3;
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Searching for ".concat(user, " in ").concat(server, "..."));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(user))];
                case 2:
                    userData = _a.sent();
                    if (!userData) {
                        throw new Error("User not found");
                    }
                    else {
                        console.log(userData);
                        return [2 /*return*/, userData];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    console.log("There was an error retrieving the user's information: " + error_3);
                    return [3 /*break*/, 5];
                case 4:
                    client.quit();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// profile("cowMAN360", "server123")
// Log ranked match between users. user1 should be whoever calls the function by default
function rankMatch(user1_1, user2_1, reaction_1) {
    return __awaiter(this, arguments, void 0, function (user1, user2, reaction, server) {
        var leftWinner, updatedUserInfo, user1TallyValue, user2TallyValue, updatedUserInfo, user2TallyValue, user1TallyValue, error_4;
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Logging ranked match for ".concat(user1, " and ").concat(user2, " in ").concat(server, "..."));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 14, 15, 16]);
                    leftWinner = reaction;
                    if (!leftWinner) return [3 /*break*/, 7];
                    // user1 won, add 1 to their win count. user2 lost, add 1 to their losses count
                    console.log("The winner is ".concat(user1));
                    return [4 /*yield*/, updateWinsLoss(user1, user2, true, server)
                        // Make a new tally key inside both user's tally object if users' first battle. Otherwise, add 1 to the existing tally object score of the user
                    ];
                case 2:
                    updatedUserInfo = _a.sent();
                    user1TallyValue = updatedUserInfo[0]["tally"][user2];
                    if (!user1TallyValue) {
                        // If tally doesn't exist for user2, create it
                        console.log("Tally for ".concat(user2, " in ").concat(user1, " file doesnt exist. Making new tally entry..."));
                        updatedUserInfo[0]["tally"][user2] = [1, 0]; // Create new tally entry
                    }
                    else {
                        // If it does exist, increment user1's score in that tally
                        console.log("Tally found for ".concat(user2, " in ").concat(user1, " file. Updating changes..."));
                        updatedUserInfo[0]["tally"][user2][0]++; // Increment user1's score in the tally
                    }
                    user2TallyValue = updatedUserInfo[1]["tally"][user1];
                    if (!user2TallyValue) {
                        // If tally doesn't exist for user1 in user2's tally, create it
                        console.log("Tally for ".concat(user1, " in ").concat(user2, " file doesnt exist. Making new tally entry..."));
                        updatedUserInfo[1]["tally"][user1] = [0, 1]; // Create new tally entry
                    }
                    else {
                        // If it does exist, increment user2's losses in that tally
                        console.log("Tally found for ".concat(user1, " in ").concat(user2, " file. Updating changes..."));
                        updatedUserInfo[1]["tally"][user1][1]++; // Increment user2's losses in the tally
                    }
                    // Update the database with new tally values
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(user1), "$", updatedUserInfo[0])];
                case 3:
                    // Update the database with new tally values
                    _a.sent();
                    console.log("Updated tally for ".concat(user1, ": ").concat(JSON.stringify(updatedUserInfo[0].tally)));
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(user2), "$", updatedUserInfo[1])];
                case 4:
                    _a.sent();
                    console.log("Updated tally for ".concat(user2, ": ").concat(JSON.stringify(updatedUserInfo[1].tally)));
                    // elo, win rate, win streak, fav opponent changes here
                    return [4 /*yield*/, updateStats(user1, server)];
                case 5:
                    // elo, win rate, win streak, fav opponent changes here
                    _a.sent();
                    return [4 /*yield*/, updateStats(user2, server)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 7:
                    // Same thing but other person is the winner
                    // user1 won, add 1 to their win count. user2 lost, add 1 to their losses count
                    console.log("The winner is ".concat(user2));
                    return [4 /*yield*/, updateWinsLoss(user2, user1, true, server)
                        // Make a new tally key inside both user's tally object if users' first battle. Otherwise, add 1 to the existing tally object score of the user
                    ];
                case 8:
                    updatedUserInfo = _a.sent();
                    user2TallyValue = updatedUserInfo[0]["tally"][user1];
                    if (!user2TallyValue) {
                        // If tally doesn't exist for user2, create it
                        console.log("Tally for ".concat(user1, " in ").concat(user2, " file doesnt exist. Making new tally entry..."));
                        updatedUserInfo[0]["tally"][user1] = [1, 0]; // Create new tally entry
                    }
                    else {
                        // If it does exist, increment user1's score in that tally
                        console.log("Tally found for ".concat(user1, " in ").concat(user2, " file. Updating changes..."));
                        updatedUserInfo[0]["tally"][user1][0]++; // Increment user1's score in the tally
                    }
                    user1TallyValue = updatedUserInfo[1]["tally"][user2];
                    if (!user1TallyValue) {
                        // If tally doesn't exist for user1 in user2's tally, create it
                        console.log("Tally for ".concat(user2, " in ").concat(user1, " file doesnt exist. Making new tally entry..."));
                        updatedUserInfo[1]["tally"][user2] = [0, 1]; // Create new tally entry
                    }
                    else {
                        // If it does exist, increment user2's losses in that tally
                        console.log("Tally found for ".concat(user2, " in ").concat(user1, " file. Updating changes..."));
                        updatedUserInfo[1]["tally"][user2][1]++; // Increment user2's losses in the tally
                    }
                    // Update the database with new tally values
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(user2), "$", updatedUserInfo[0])];
                case 9:
                    // Update the database with new tally values
                    _a.sent();
                    console.log("Updated tally for ".concat(user2, ": ").concat(JSON.stringify(updatedUserInfo[0].tally)));
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(user1), "$", updatedUserInfo[1])];
                case 10:
                    _a.sent();
                    console.log("Updated tally for ".concat(user1, ": ").concat(JSON.stringify(updatedUserInfo[1].tally)));
                    // elo, win rate, win streak, fav opponent changes here
                    return [4 /*yield*/, updateStats(user1, server)];
                case 11:
                    // elo, win rate, win streak, fav opponent changes here
                    _a.sent();
                    return [4 /*yield*/, updateStats(user2, server)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14:
                    error_4 = _a.sent();
                    console.log("There was an error logging the match info: " + error_4);
                    return [3 /*break*/, 16];
                case 15:
                    client.quit();
                    return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
// rankMatch("cowMAN360", "Darth Weeder", true, "server123")
// Log match between users. user1 should be whoever calls the function by default
function match(user1_1, user2_1, reaction_1) {
    return __awaiter(this, arguments, void 0, function (user1, user2, reaction, server) {
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_a) {
            console.log("Logging match for ".concat(user1, " and ").concat(user2, " in ").concat(server, "..."));
            try {
            }
            catch (error) {
                console.log("" + error);
            }
            finally {
                client.quit();
            }
            return [2 /*return*/];
        });
    });
}
// match("cowMAN360", "Darth Weeder", true, "server123")
// Create player leaderboard information from server information. Sort users by elo
function leaderboard() {
    return __awaiter(this, arguments, void 0, function (server) {
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_a) {
            console.log("Creating leaderboard in ".concat(server, "..."));
            try {
                // Get all users from specific server, sort in order of elo, format and return
                return [2 /*return*/, {}];
            }
            catch (error) {
                console.log("" + error);
                return [2 /*return*/, {}];
            }
            finally {
                client.quit();
            }
            return [2 /*return*/];
        });
    });
}
// Get scores between two users
function matchHistory(user1_1, user2_1) {
    return __awaiter(this, arguments, void 0, function (user1, user2, server) {
        var userOne, userTwo, matchHistory_1, tally, error_5;
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Getting match history for ".concat(user1, " and ").concat(user2, " in ").concat(server, "..."));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(user1))];
                case 2:
                    userOne = _a.sent();
                    return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(user2))];
                case 3:
                    userTwo = _a.sent();
                    if (!userOne || !userTwo) {
                        throw new Error("User was not found in the database..");
                    }
                    return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(user1))];
                case 4:
                    matchHistory_1 = _a.sent();
                    tally = matchHistory_1["tally"][user2];
                    if (!tally) {
                        throw new Error("There has been no matches between these players.");
                    }
                    console.log(tally);
                    // get elo here 
                    return [2 /*return*/, { tally: tally }];
                case 5:
                    error_5 = _a.sent();
                    console.log("There was an error retrieving the user's information: " + error_5);
                    return [3 /*break*/, 7];
                case 6:
                    client.quit();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// matchHistory("cowMAN360", "Darth Weeder", "server123")
// Helper functions:
// Function that adds and removes wins/losses or rankedWins/rankedLosses for both users
function updateWinsLoss(winner, loser, ranked, server) {
    return __awaiter(this, void 0, void 0, function () {
        var winnerData, loserData, winType, lossType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(winner))];
                case 1:
                    winnerData = _a.sent();
                    if (!winnerData) {
                        throw new Error("User ".concat(winner, " not found"));
                    }
                    return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(loser))];
                case 2:
                    loserData = _a.sent();
                    if (!loserData) {
                        throw new Error("User ".concat(loser, " not found"));
                    }
                    winType = ranked === true ? "rankedWins" : "wins";
                    lossType = ranked === true ? "rankedLosses" : "losses";
                    // Adding 1 to rankedWins cout and 1 to rankedLosses count for respective users
                    winnerData[winType] = winnerData[winType] + 1;
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(winner), "$", winnerData)];
                case 3:
                    _a.sent();
                    console.log("".concat(winType, " updated for user ").concat(winner, " in ").concat(server, " to ").concat(JSON.stringify(winnerData.winType)));
                    loserData[lossType] = loserData[lossType] + 1;
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(loser), "$", loserData)];
                case 4:
                    _a.sent();
                    console.log("".concat(lossType, " updated for user ").concat(loser, " in ").concat(server, " to ").concat((JSON.stringify(loserData.lossType))));
                    return [2 /*return*/, [winnerData, loserData]];
            }
        });
    });
}
function setElo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (error) {
                console.log("" + error);
            }
            finally {
                client.quit();
            }
            return [2 /*return*/];
        });
    });
}
// Function to recalculate user stats (win rate, fav opponent changes). UNTESTED
function updateStats(username_1) {
    return __awaiter(this, arguments, void 0, function (username, server) {
        var userData, totalMatches, winRate, totalRankedMatches, rankedWinRate, favoriteOpponent, maxMatches, _i, _a, _b, opponent, matches, totalMatches_1, error_6;
        if (server === void 0) { server = "testServer"; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Updating user stats...");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    console.log("Retrieving ".concat(username, "'s data from DB..."));
                    return [4 /*yield*/, client.json.get("".concat(server, ":users:").concat(username))];
                case 2:
                    userData = _c.sent();
                    if (!userData) {
                        throw new Error("User ".concat(username, " not found"));
                    }
                    console.log("Calculating win rate...");
                    totalMatches = userData.wins + userData.losses;
                    winRate = totalMatches > 0 ? (userData.wins / totalMatches) * 100 : 0;
                    console.log("Calculating ranked win rate...");
                    totalRankedMatches = userData.rankedWins + userData.rankedLosses;
                    rankedWinRate = totalRankedMatches > 0 ? (userData.rankedWins / totalRankedMatches) * 100 : 0;
                    console.log("Determining favourite opponent...");
                    favoriteOpponent = "";
                    maxMatches = 0;
                    for (_i = 0, _a = Object.entries(userData.tally); _i < _a.length; _i++) {
                        _b = _a[_i], opponent = _b[0], matches = _b[1];
                        totalMatches_1 = matches[0] + matches[1];
                        if (totalMatches_1 > maxMatches) {
                            maxMatches = totalMatches_1;
                            favoriteOpponent = opponent;
                        }
                    }
                    console.log("Updating the DB...");
                    // Update user data with recalculated statistics
                    userData.winRate = winRate.toFixed(2);
                    userData.rankedWinRate = rankedWinRate.toFixed(2);
                    userData.favoriteOpponent = favoriteOpponent;
                    // Update the database with the recalculated user data
                    return [4 /*yield*/, client.json.set("".concat(server, ":users:").concat(username), "$", userData)];
                case 3:
                    // Update the database with the recalculated user data
                    _c.sent();
                    console.log("Recalculated statistics for ".concat(username));
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _c.sent();
                    console.log("Error recalculating user statistics: " + error_6);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// updateStats("Ashwin", "server123")
