/* 
Steps:
1. Make a client and connect
2. Handle client connection error
3. Make async functions to to transactions on redis
*/

// Making a client and connecting:
const { createClient } = require('redis');

const client = createClient({
    password: '8FwY4BF6lOKNSGWISbqLAd9fNt9RREja',
    socket: {
        host: 'redis-16831.c89.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 16831
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
getRedis("Test")