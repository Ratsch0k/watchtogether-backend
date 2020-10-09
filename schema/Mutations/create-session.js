const { GraphQLNonNull, GraphQLString } = require("graphql");
const client = require("../../db");
const SessionType = require("../session-type");
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const passport = require('passport');

const createSessionID = () => {
  return uuid.v4();
}

const checkIfIdExists = async (id) => {
  return Boolean(await client.exists(id));
}

const resolve = async (parent, args, ctx) => {
  console.dir(ctx.req.user);
  // Generate uuid and check it if already exists
  let id;
  do {
    id = createSessionID();
  } while (await checkIfIdExists(id));

  // Hash password
  const hashedPassword = await bcrypt.hash(args.password, 10);

  await client.hmset(id, 'password', hashedPassword, 'state', 0);

  await new Promise((resolve, reject) => {
    // Modify request and put id and password in body
    ctx.req.body = {
      username: id,
      password: args.password,
    };
    passport.authenticate('local')(ctx.req, ctx.res, () => resolve());
  });

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