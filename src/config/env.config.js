const dotenv = require('dotenv');

const env = {
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
};

module.exports = env;
