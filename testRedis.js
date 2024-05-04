/* 
Steps:
1. Make a client and connect
2. Handle client connection error
3. Make async functions to to transactions on redis
*/

// Making a client and connecting:
const { createClient } = require('redis');
require('dotenv').config()

const client = createClient({
    password: process.env.redisClientPassword,
    socket: {
        host: process.env.redisClientHost,
        port: process.env.redisClientPort
    }
});

client.connect()

// Handling client connection error
client.on('error', (err) => {
    console.error('Redis Client Error:', err);
    client.quit()
});

// Functions:
// Function to get a string value from redis
async function getRedis(key) {
    console.log("In getRedis func")
    if (!client.isOpen) {
        client.connect()
    }

    const x = await client.get(key)
    console.log(x)
    client.quit()
    console.log('\n')
}

// Function to set a string value in redis
async function setRedis(key, value) {
    console.log('In setRedis func')
    if (!client.isOpen) {
        client.connect()
    }

    try {
        const y = await client.set(key, value)
        console.log('successfully set value')
    } catch (error) {
        console.log(error)
    } finally {
        client.quit()
    }
    console.log('\n')
}

// For testing:
// setRedis("Test", "Test value!")
// getRedis("Test")

// Example JSON data
const object = {
    "users": [
        {
            "username": "someAvocado395",
            "joinDate": "05/03/2024",
            "wins": 13,
            "losses": 5,
            "winRate": 60.7,
            "rankedWins": 6,
            "rankedLosses": 3,
            "rankedWinRate": 46.5,
            "eloPoints": 42,
            "serverRanking": 5,
            "highestServerRanking": 3,
            "highestWinStreak": 7,
            "currentWinStreak": 3,
            "favoriteOpponent": "opponent2",
            "tally": {
                "opponent1": [5,2],
                "opponent2": [6,4]
            },
            "clanMembership": "Pokemon Clan"
        },
        {
            "username": "cowMAN360",
            "joinDate": "05/03/2024",
            "wins": 13,
            "losses": 5,
            "winRate": 60.7,
            "rankedWins": 6,
            "rankedLosses": 3,
            "rankedWinRate": 46.5,
            "eloPoints": 42,
            "serverRanking": 5,
            "highestServerRanking": 3,
            "highestWinStreak": 7,
            "currentWinStreak": 3,
            "favoriteOpponent": "opponent2",
            "tally": {
                "opponent1": [5,2],
                "opponent2": [6,4]
            },
            "clanMembership": "NULL"
        }
    ],
    "clans": [
        {
            "name": "Pokemon Clan",
            "image": "https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj",
            "leader": "someAvocado395",
            "clan elo": 97,
            "clan members": ["someAvocado395", "opponent1", "opponent2"]
        }
    ]
};

// Function to set JSON value in redis
async function setRedisJson(object) {
    console.log('In setRedisJson func')
    if (!client.isOpen) {
        client.connect()
    }

    try {
        const z = await client.set('user', JSON.stringify(object))
    } catch (error) {
        console.log(error)
    } finally {
        client.quit()
    }
    console.log('\n')
}

// Function to get JSON value from redis
async function getRedisJson(key) {
    console.log("In getRedisJson func")
    if (!client.isOpen) {
        client.connect()
    }
    const xx = await client.get(key)
    const formattedValue = JSON.parse(xx)
    console.log(formattedValue)
    console.log(formattedValue.username) // get individual information like you normally would from JSON
    // console.log("This type of variable contains a: " + typeof(JSON.parse(xx)))
    client.quit()
    console.log('\n')
}
setRedisJson(object)
// getRedisJson('user')