const config = require('./config');
const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

client.on('error', console.error);

module.exports = {
  client: client,
  hmget: promisify(client.hmget).bind(client),
  hmset: promisify(client.hmset).bind(client),
  exists: promisify(client.exists).bind(client),
};