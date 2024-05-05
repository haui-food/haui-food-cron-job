const axios = require('axios');

const { env } = require('../config');
const { RENDER_API } = require('../constants/index');

const callRenderService = async (idService, apiKey, action) => {
  const url = `${RENDER_API}/${idService}/${action}`;
  const headers = { Authorization: `Bearer ${apiKey}` };

  try {
    await axios.post(url, {}, { headers });
  } catch (error) {
    console.error(error);
  }
};

const restartServices = async () => {
  console.log('Restarting services...');
  const { services } = env;

  const action = 'restart';

  for (const service of services) {
    await callRenderService(service.idService, service.apiKeyService, action);
  }
  console.log('Services restarted.');
};

module.exports = { restartServices };
