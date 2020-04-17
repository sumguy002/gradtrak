const redis = require('redis');
const redisCache = require('express-redis-cache');

const cache = redisCache({
  client: redis.createClient(process.env.REDIS_URL),
});

module.exports.cache = cache;