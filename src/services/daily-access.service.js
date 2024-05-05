const axios = require('axios');

const { env } = require('../config');
const { DailyAccess } = require('../models');
const getStartAndEndOfDay = require('../utils/getStartAndEndOfDay');

const fetchDataCount = async () => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: env.countAccess.apiURL,
    headers: {
      'x-api-key': env.countAccess.apiKey,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data.totalAccess;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const updateCount = async () => {
  const count = await fetchDataCount();

  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  const dailyAccess = await DailyAccess.findOne({
    date: {
      $lte: endOfDay,
      $gte: startOfDay,
    },
  });

  if (!dailyAccess) {
    await DailyAccess.create({
      total: count,
      date: new Date(),
    });

    console.log('Created new daily access count:', count);
  } else {
    dailyAccess.total += count;
    await dailyAccess.save();

    console.log('Updated daily access count:', dailyAccess.total);
  }
};

module.exports = { updateCount };
