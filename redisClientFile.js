const { createClient } = require('redis');
require('dotenv').config()

// Making a client and connecting:
const client = createClient({
    password: process.env.redisClientPassword,
    socket: {
        host: process.env.redisClientHost,
        port: process.env.redisClientPort
    }
});

// Connect to DB only if not already connected
if (!client.isOpen) {
    client.connect()
}

// Handling client connection error
client.on('error', (err) => {
    console.error('Redis Client Error:', err);
    client.quit()
});

module.exports = client;