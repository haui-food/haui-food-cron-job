const axios = require('axios');

const { RENDER_API, RENDER_SERVICE_ACTION } = require('../constants/index');

const renderService = async (idService, apiKey, action) => {
  const url = `${RENDER_API}/${idService}/${RENDER_SERVICE_ACTION[action]}`;
  const headers = { Authorization: `Bearer ${apiKey}` };

  try {
    const response = await axios.post(url, {}, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderService };
