"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// compile with `tsc (name of file)`, then run the js file
const Discord = require('discord.js');
const redis_1 = require("redis");
require('dotenv').config();
const discordClient = new Discord.Client();
const redisClient = (0, redis_1.createClient)({
    password: process.env.redisClientPassword,
    socket: {
        host: process.env.redisClientHost,
        port: process.env.redisClientPort ? parseInt(process.env.redisClientPort) : undefined // Required for this to work in ts
    }
});
redisClient.connect();
discordClient.connect();
//initialize bot, show logged in message... NOT DONE FROM HERE DOWN
discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag} `);
});
console.log("hello");
discordClient.on('message', (msg) => {
});
