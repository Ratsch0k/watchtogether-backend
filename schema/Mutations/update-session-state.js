const { GraphQLNonNull, GraphQLString } = require("graphql")
const client = require("../../db")
const ControlPlayingEnum = require("../control-playing-enum");
const SessionType = require('../session-type');
const pubsub = require("../pubsub");

const checkIfSessionExists = async (id) => {
  return Boolean(await client.exists(id));
}

const resolve = async(parent, args) => {
  if (!await checkIfSessionExists(args.id)) {
    throw new Error('Session doesn\'t exist');
  }

  // Update session state
  await client.hmset(args.id, 'state', args.state);
  
  const updateState = await client.hmget(args.id, 'state');

  const session = {
    id: args.id,
    control: {
      state: parseInt(updateState[0], 10),
    },
  };

  // Publish new state
  pubsub.publish(args.id, {stateChanged: session});

  return session;
}

module.exports = {
  type: new GraphQLNonNull(SessionType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    state: {
      type: new GraphQLNonNull(ControlPlayingEnum),
    },
  },
  resolve,
}