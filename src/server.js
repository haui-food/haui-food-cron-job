const axios = require('axios');

const serverRender = async (idService, apiKey) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://api.render.com/v1/services/${idService}/resume`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

serverRender('srv-cl5579c72pts739s33ig', 'rnd_Ib48grezjJqqQGytpGc3s7btMRak');
