const { GraphQLNonNull, GraphQLString } = require("graphql");
const client = require("../../db");
const pubsub = require("../pubsub");
const SessionType = require("../session-type");
const {SessionError} = require('../../errors');
const bcrypt = require('bcrypt');

const isUserAuthorized = async (id, password) => {
  // Check if session exists and then if password matches
  if (!await client.exists(id)) {
    return false;
  }

  const session = await client.hmget(id, 'password');

  if (session[0] === null || !await bcrypt.compare(password, session[0])) {
    return false;
  }

  return true;
}

const subscribe = async (parent, args) => {
  // Check if session exists and then if password matches
  if (!await isUserAuthorized(args.id, args.password)) {
    throw new SessionError();
  }

  return pubsub.asyncIterator(args.id);
}

const resolve = async (parent, args) => {
  if (!await isUserAuthorized(args.id, args.password)) {
    throw new SessionError();
  }

  // Get session
  const session = await client.hmget(args.id, 'id', 'state');

  return {
    id: session[0],
    control: {
      state: parseInt(session[1], 10),
    },
  };
}

module.exports = {
  type: SessionType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  subscribe,
  resolve,
}