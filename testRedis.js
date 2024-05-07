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

// Function to set JSON value in redis, In this case, setting a user in the DB
async function setRedisJson(username) {
    // Example JSON data
    const userData = {
    "username": username,
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
}
    console.log('In setRedisJson func')
    if (!client.isOpen) {
        client.connect()
    }

    try {
        const z = await client.json.set(`server123:users:${username}`, '$', userData)
        console.log(`Set information for user: ${username}`)
    } catch (error) {
        console.log(error)
    } finally {
        client.quit()
    }
    console.log('\n')
}

// Function to get JSON value from redis, in this case, getting a user from the DB
async function getRedisJson(user, server = "server123") {
    console.log("In getRedisJson func")
    console.log(`Searching for ${user} in ${server}`)
    if (!client.isOpen) {
        client.connect()
    }
    const xx = await client.json.get(`${server}:users:${user}`)
    console.log(xx) // get individual information like you normally would from JSON
    console.log(xx.name) // get individual information like you normally would from JSON
    console.log(xx.wins) // get individual information like you normally would from JSON
    console.log("This type of variable contains a: " + typeof(xx))
    console.log("This type of variable contains a: " + typeof(xx.wins))
    client.quit()
    console.log('\n')
}

// Function to get all JSON values in redis under the specified server namespace
async function getRedisJsonAll(server = "server123") {
    console.log(`Searching for all users in ${server}`);
    const pattern = `${server}:users:*`;

    console.log('In getRedisJsonAll func');
    if (!client.isOpen) {
        client.connect();
    }
    try {
        // Get all keys matching the pattern and get only the username of the users
        const userKeys = await client.keys(pattern)
        const formattedUserKeys = userKeys.map(key => key.split(":")[2])
        console.log(formattedUserKeys)

        // Fetch JSON data for each key
        const usersData = [];
        for (const userKey of userKeys) {
            const userData = await client.json.get(userKey);
            usersData.push(userData);
        };
    
        // Log all retrieved JSON data
        console.log('All Users:');
        console.log(usersData);

    } catch (error) {
        console.log(error);
    } finally {
        client.quit();
    }
    console.log('\n');
}

// Function to change specific value for specific user in DB, in this case, changing the value of wins. DOES NOT DO THIS IN PLACE, can be optimized
async function editRedisJson(user, param, newValue, server = "server123") {
    if (!client.isOpen) {
        client.connect();
    }
    console.log(`Editing ${user}'s ${param} to ${newValue} in ${server}`);

    try {
        const key = `${server}:users:${user}`;
        // Fetch the existing user data
        const existingUserData = await client.json.get(key);
        // console.log(existingUserData)

        if (!existingUserData) {
            console.log(`User ${user} not found in ${server}`);
            return;
        }

        // Update the specified parameter with the new value
        existingUserData[param] = newValue;

        // Set the updated user data back to the Redis database
        await client.json.set(key, '$', existingUserData);
        console.log(`${param} updated for user ${user} in ${server} to ${newValue}`);
    } catch (error) {
        console.error('Error editing JSON value:', error);
    } finally {
        // Quit Redis connection
        client.quit();
    }
    console.log('\n');
}


// setRedisJson("Darth Weeder")
// getRedisJson("someAvocado395")
// getRedisJsonAll()
// editRedisJson("someAvocado395", "wins", 40)