const { GraphQLNonNull, GraphQLString } = require("graphql");
const SessionType = require("../session-type");
const bcrypt = require('bcrypt');
const { CreateSessionError } = require("../../errors");
const {checkIfIdExists, createSessionID, login} = require('../../util');
const client = require('../../db');

/**
 * GraphQL resolver.
 * @param {any} parent  Parent
 * @param {any} args    Args
 * @param {any} ctx     Context
 */
const resolve = async (parent, args, ctx) => {
  // Generate uuid and check it if already exists
  let id;
  do {
    id = createSessionID();
  } while (await checkIfIdExists(id));

  // Hash password
  const hashedPassword = await bcrypt.hash(args.password, 10);
  await client.hmset(id, 'password', hashedPassword, 'state', 0);

  try {
    await login(id, args.password, ctx);
  } catch (e) {
    await client.del(id);
    throw new CreateSessionError();
  }

  return {
    id,
    control: {
      state: 0,
    },
  };
}

module.exports = {
  type: new GraphQLNonNull(SessionType),
  args: {
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve,
}