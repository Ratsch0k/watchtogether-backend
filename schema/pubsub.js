const { RedisPubSub } = require('graphql-redis-subscriptions');
const {PubSub} = require('graphql-subscriptions');
const debug = require('debug')('watchtogether:server')
const Redis = require('ioredis');
const config = require('../config');

let pubsub;
if (process.env.NODE_ENV === 'production') {
  debug('Using redis subscription');
  const options = {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  };
  pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });
} else {
  debug('Using graphql subscription (not for production usage)')
  pubsub = new PubSub();
}


module.exports = pubsub;