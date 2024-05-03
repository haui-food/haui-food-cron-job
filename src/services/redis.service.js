const { redis } = require('../config');

const convertExToSecond = (ex) => {
  const type = ex.substring(ex.length - 1);
  const exNum = +ex.split(type)[0];

  switch (type) {
    case 's':
      return exNum;
    case 'm':
      return exNum * 60;
    case 'h':
      return exNum * 3600;
    default:
      throw new Error('Type ex not exist');
  }
};

const setex = async (category, key, ex, value) => {
  return await redis.setEx(`${category}:${key}`, convertExToSecond(ex), JSON.stringify(value));
};

const get = async (category, key) => {
  return await redis.get(`${category}:${key}`);
};

const del = async (key) => {
  return await redis.del(key);
};

const hSet = async (key, field, value) => {
  await redis.hSet(key, JSON.stringify(field), JSON.stringify(value));
  await redis.expire(key, 10800);
  return true;
};

const getValueByKey = async (key, cursor = 0) => {
  return await redis.hScan(key, cursor);
};

const hGet = async (key, field) => {
  let result = await redis.hGet(key, JSON.stringify(field));
  return JSON.parse(result);
};

module.exports = {
  get,
  del,
  hSet,
  hGet,
  setex,
  getValueByKey,
};
