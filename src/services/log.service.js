const axios = require('axios');

const { env } = require('../config');
const telegramService = require('./telegram.service');

const fetchDataLogs = async () => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: env.log.apiURL,
    headers: {
      'x-api-key': env.log.apiKey,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data.data.logs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const sendLogs = async () => {
  console.log('Sending logs...');

  const logs = await fetchDataLogs();

  if (logs.length === 0) return;

  const { logChatId } = env.telegram;

  await telegramService.sendMessage(logs.join('\n'), logChatId);
};

module.exports = { sendLogs };
