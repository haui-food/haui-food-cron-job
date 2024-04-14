require('dotenv').config();

const env = {
  mongoURI: process.env.MONGO_URI,
  rabbitmqURI: process.env.RABBITMQ_URI,
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
};

module.exports = env;
