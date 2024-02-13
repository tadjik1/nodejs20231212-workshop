const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const config = require("./config");
const handleText = require("./handleText");

const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Отправь мне любой текст для озвучки"));
bot.help((ctx) => ctx.reply("Отправь мне любой текст для озвучки"));

bot.on(message("text"), handleText);

module.exports = bot;
