// compile with `tsc (name of file)`, then run the js file
const Discord = require('discord.js')
import { createClient } from 'redis';
require('dotenv').config()

const discordClient = new Discord.Client();

const redisClient = createClient({
    password: process.env.redisClientPassword,
    socket: {
        host: process.env.redisClientHost,
        port: process.env.redisClientPort ? parseInt(process.env.redisClientPort) : undefined // Required for this to work in ts
    }
});

redisClient.connect()
discordClient.connect();

//initialize bot, show logged in message... NOT DONE FROM HERE DOWN
discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag} `)
})


console.log("hello")

discordClient.on('message', msg => {

})