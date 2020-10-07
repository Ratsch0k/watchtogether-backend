const configs = {
  production: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
  development: {
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,
  },
};

module.exports = configs[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];