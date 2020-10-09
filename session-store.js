const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./db');

module.exports = new RedisStore({client: redisClient.client})