const client = require("../../db");
const pubsub = require("../pubsub");
const SessionType = require("../session-type");

const subscribe = async (parent, args, ctx) => {
  const {id} = ctx;

  return pubsub.asyncIterator(id);
}

const resolve = async (parent, args, ctx) => {
  const {id} = ctx;

  // Get session
  const session = await client.hmget(id, 'id', 'state');

  return {
    id: session[0],
    control: {
      state: parseInt(session[1], 10),
    },
  };
}

module.exports = {
  type: SessionType,
  subscribe,
  resolve,
}