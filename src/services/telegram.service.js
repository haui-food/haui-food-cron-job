const { Telegraf } = require('telegraf');

const { env } = require('../config');
const currentTime = require('../utils/getTime');

const bot = new Telegraf(env.telegram.token);

const sendMessage = async (message, chatId) => {
  try {
    await bot.telegram.sendMessage(chatId, `${currentTime()} - ${message}`);
  } catch (error) {
    await bot.telegram.sendMessage(chatId, `${currentTime()} - ${error.message}`);
  }
};

const sendFile = async (filePath, chatId) => {
  try {
    await bot.telegram.sendDocument(chatId, { source: filePath });
  } catch (error) {
    await bot.telegram.sendMessage(chatId, `${currentTime()} - ${error.message}`);
  }
};

module.exports = {
  sendMessage,
  sendFile,
};
