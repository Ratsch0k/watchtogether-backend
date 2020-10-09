const { GraphQLNonNull, GraphQLString } = require("graphql");
const client = require("../../db");
const { checkIfIdExists, login } = require("../../util");
const bcrypt = require('bcrypt');
const { JoinSessionError } = require("../../errors");

const resolve = async (parent, args, ctx) => {
  const {id, password} = args;

  // Check if session exists
  if (!await checkIfIdExists(id)) {
    throw new JoinSessionError();
  }

  // Get session data
  const sessionData = client.hmget(id, 'password', 'state');

  // Check if password is correct
  try {
    await bcrypt.compare(password, sessionData[0]);
  } catch (e) {
    throw new JoinSessionError();
  }

  // Log user in for session
  await login(id, password, ctx.req);

  return {
    id,
    control: {
      state: sessionData[1],
    },
  };
}

module.exports = {
  type: new GraphQLNonNull(SessionType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve,
}