var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { HttpError, NotFoundError, InternalServerError } = require('./errors');
const { graphqlHTTP } = require('express-graphql');
const {schema} = require('./schema');
const redisClient = require('./db');
const graphQLPlayground = require('graphql-playground-middleware-express').default;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const config = require('./config');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const passDebug = require('debug')('watchtogether:passport');

/**
 * Initialize passport
 */
passport.serializeUser(function(session, done) {
  passDebug('Serialize session: %o', session);
  done(null, session.id);
});

passport.deserializeUser(function(id, done) {
  passDebug('Deserialize session: %o', id);
  done(null, {id});
});

passport.use(new LocalStrategy(
  async (id, password, done) => {
    passDebug('login: %o, %o', id, password);
    if (!await redisClient.exists(id)) {
      return done(null, false);
    }
    passDebug('session exists');

    const session = redisClient.hmget(id, 'password');
    let validPassword;
    try {
      await bcrypt.compare(password, session[0]);
      validPassword = true;
    } catch (e) {
      validPassword = false;
    }

    
    if (validPassword) {
      passDebug('password invalid');
      return done(null, false);
    }
    passDebug('password valid');

    return done(null, {id});
  }
));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  store: new RedisStore({client: redisClient.client}),
  resave: false,
  secret: config.sessionSecret,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

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
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: false,
    context: {req, res},
  })),
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
