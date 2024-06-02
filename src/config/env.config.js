require('dotenv').config();

const parseArrayToObjects = require('../utils/parseArrayToObjects');

const env = {
  port: process.env.PORT,
  rabbitmqURI: process.env.RABBITMQ_URI,
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    logChatId: process.env.TELEGRAM_LOG_CHAT_ID,
    backupChatId: process.env.TELEGRAM_BACKUP_CHAT_ID,
  },
  log: {
    apiURL: process.env.LOG_API_URL,
    apiKey: process.env.LOG_API_KEY,
  },
  countAccess: {
    apiURL: process.env.COUNT_ACCESS_API_URL,
    apiKey: process.env.COUNT_ACCESS_API_KEY,
  },
  services: parseArrayToObjects(process.env.SERVICES) || [],
};

module.exports = env;
