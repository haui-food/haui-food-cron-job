require('dotenv').config();

const env = {
  mongoURI: process.env.MONGO_URI,
  rabbitmqURI: process.env.RABBITMQ_URI,
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  log: {
    apiURL: process.env.LOG_API_URL,
    apiKey: process.env.LOG_API_KEY,
  },
};

module.exports = env;
