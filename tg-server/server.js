const express = require("express");
const http = require("http").createServer(express);
// const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const axios = require("axios");
const tgBot = require("node-telegram-bot-api");
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const GAME_ENDPOINT = "/game";

const bot = new tgBot(TOKEN, { polling: true });
const app = express();

// Use body-parser to parse incoming requests
app.use(bodyParser.json());

bot.onText(/\/game/, async (message) => {
  console.log("Received /game command:", message);
  const chatId = message.chat.id;

  try {
    // Make an HTTP request to your Vercel game URL
    const response = await axios.get("https://game-project-rho.vercel.app");

    // Forward the game content to the Telegram chat
    bot.sendMessage(chatId, "Hello, this is your game!");
    bot.sendMessage(chatId, response.data);
  } catch (error) {
    // Handle errors, e.g., the game URL is not accessible
    console.error("Error fetching game content:", error);
    bot.sendMessage(chatId, "Error fetching game content");
  }
});

bot.on("message", (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  console.log("received message:", text);
});

http.listen(3000, function () {
  console.log("Server Started");
});
