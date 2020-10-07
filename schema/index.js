const {GraphQLSchema} = require('graphql');

const RootQuery = require('./Query');
const Mutations = require('./Mutations');
const Subscriptions = require('./Subscriptions');
const pubsub = require('./pubsub');

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
  subscription: Subscriptions,
});

module.exports = {
  schema,
  RootQuery,
  Mutations,
  Subscriptions,
  pubsub,
};