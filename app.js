var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { HttpError, NotFoundError, InternalServerError } = require('./errors');
const { graphqlHTTP } = require('express-graphql');
const {schema} = require('./schema');
const graphQLPlayground = require('graphql-playground-middleware-express').default;
const config = require('./config');

const redis = require('redis');
const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.env.REDIS_PORT,
});

redisClient.on('error', console.error);


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(
  '/playground',
  graphQLPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
  }),
);

/**
 * Add graphql
 */

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new NotFoundError());
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err);
  } else {
    res.status(500).send(new InternalServerError())
  }
});

module.exports = app;
