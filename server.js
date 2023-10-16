const server = require("express")();
const http = require("http").createServer(server);
const io = require("socket.io")(http);
const tgBot = require("node-telegram-bot-api");
require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new tgBot(TOKEN, { polling: true });

bot.on("message", (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  
});

http.listen(3000, function () {
  console.log("Server Started");
});
