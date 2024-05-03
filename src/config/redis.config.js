const { createClient } = require('redis');

const env = require('./env.config');

const redis = createClient({ url: env.redisURI });

redis.on('connect', () => console.log(`Redis connected...`));

redis.on('error', (err) => console.log('Redis Client Error', err));

redis.connect();

module.exports = redis;
