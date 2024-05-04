// compile with `tsc (name of file)`, then run the js file
const Discord = require('discord.js')
import { createClient } from 'redis';

const discordClient = new Discord.Client();

const redisClient = createClient({
    password: '8FwY4BF6lOKNSGWISbqLAd9fNt9RREja',
    socket: {
        host: 'redis-16831.c89.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 16831
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