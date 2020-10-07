const { GraphQLNonNull, GraphQLString } = require("graphql");
const pubsub = require("../pubsub");
const SessionType = require("../session-type");

module.exports = {
  type: SessionType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  subscribe: (parent, args) => {
    return pubsub.asyncIterator(args.id);
  }
}