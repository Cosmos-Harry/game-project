const tgBot = require("node-telegram-bot-api");
const express = require("express");
const path = require("path");
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const gameName = "freeFall";
const port = process.env.PORT || 3000;
const bot = new tgBot(TOKEN, { polling: true });
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

bot.onText(/\/game/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendGame(chatId, gameName);
});

bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  bot.answerCallbackQuery(callbackQuery.id, {
    url: `https://game-project-rho.vercel.app`,
  });
});

bot.on("inline_query", (query) => {
  const inlineQuery = query.query;
  const results = [];

  if (inlineQuery === "free fall"||"Free Fall"|| "freeFall"|| "Free fall"|| "free Fall") {
    const result = {
      type: "game",
      id: "1",
      game_short_name: "freeFall",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Play Now",
              callback_game: "game",
            },
          ],
        ],
      },
    };

    results.push(result);
  }
  bot.answerInlineQuery(query.id, results);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
