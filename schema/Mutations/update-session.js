const { GraphQLNonNull, GraphQLString } = require("graphql")
const client = require("../../db")
const ControlPlayingEnum = require("../control-playing-enum");
const SessionType = require('../session-type');
const pubsub = require("../pubsub");
const {SessionError, NoSessionError} = require('../../errors');
const {checkIfIdExists} = require('../../util');

const resolve = async(parent, args, ctx) => {
  if (!ctx.user) {
    throw new NoSessionError();
  }

  const {id} = ctx.user;

  if (!await checkIfIdExists(id)) {
    throw new SessionError();
  }

  // Update session state
  await client.hmset(id, 'state', args.state);
  
  const updateState = await client.hmget(id, 'state');

  const session = {
    id,
    control: {
      state: parseInt(updateState[0], 10),
    },
  };

  // Publish new state
  pubsub.publish(id, {stateChanged: session});

  return session;
}

module.exports = {
  type: new GraphQLNonNull(SessionType),
  args: {
    state: {
      type: new GraphQLNonNull(ControlPlayingEnum),
    },
  },
  resolve,
}