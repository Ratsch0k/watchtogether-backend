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
const store = require('./session-store');
const cors = require('cors');

/**
 * Initialize passport
 */
passport.serializeUser(function(session, done) {
  done(null, session.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {id});
});

passport.use(new LocalStrategy(
  async (id, password, done) => {
    if (!await redisClient.exists(id)) {
      return done(null, false);
    }

    const session = await redisClient.hmget(id, 'password');
    try {
      if (!await bcrypt.compare(password, session[0])) {
        return done(null, false);
      }
    } catch (e) {
      return done(null, false);
    }

    return done(null, {id});
  }
));

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    credentials: true,
  }));
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  store,
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
  graphqlHTTP({
    schema,
    graphiql: false,
  }),
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
