const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLSchema, GraphQLScalarType } = require("graphql");
const {PubSub} = require('graphql-subscriptions');

const pubsub = new PubSub();

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addComment: {
      type: new GraphQLNonNull(CommentType),
      args: {
        message: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        pubsub.publish('commentAdded', {commentAdded: {message: args.message}});
        return {message: args.message};
      }
    }
  },
});

const Subscriptions = new GraphQLObjectType({
  name: 'Subscriptions',
  fields: {
    commentAdded: {
      type: CommentType,
      subscribe: () => {
        return pubsub.asyncIterator('commentAdded');
      },
    },
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    hello: {
      type: new GraphQLNonNull(CommentType),
      resolve() {
        return {message: 'Hello World!'};
      },
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
  subscription: Subscriptions,
});