import { Bot } from "grammy";

import { getAssignments } from "./selenium"; // Import the function to get assignments

import dotenv from 'dotenv';



dotenv.config();



const bot = new Bot(process.env.TOKEN!); // <-- put your bot token between the "" (https://t.me/BotFather)



// Reply to any message with "Hi there!".

bot.on("message", async (ctx) => {

if(ctx.message.text?.includes("Hi") || ctx.message.text?.includes("Hello") || ctx.message.text?.includes("Hey") || ctx.message.text?.includes("hi") || ctx.message.text?.includes("hello") || ctx.message.text?.includes("hey")){

ctx.reply("Hello, I'm Weston's personal school bot :)")

}



if(ctx.message.text?.includes("assignments") || ctx.message.text?.includes("homework") || ctx.message.text?.includes("Assignments") || ctx.message.text?.includes("Homework") || ctx.message.text?.includes("assignment") || ctx.message.text?.includes("Assignment")){

if(!ctx.message.text.includes(process.env.CODE!)) return;

ctx.reply("One sec, lemme check your assignments...")

let assignments = await getAssignments();

ctx.reply("You have " + assignments);

}



if(ctx.message.text?.includes("bye") || ctx.message.text?.includes("Bye") || ctx.message.text?.includes("cya") || ctx.message.text?.includes("Cya"))

ctx.reply("Cya")

});



bot.start();