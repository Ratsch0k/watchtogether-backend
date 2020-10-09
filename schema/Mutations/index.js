const {GraphQLNonNull, GraphQLObjectType, GraphQLString} = require('graphql');
const pubsub = require('../pubsub');
const CommentType = require('../comment-type');
const createSession = require('./create-session');
const updateSessionState = require('./update-session-state');
const joinSession = require('./join-session');

module.exports = new GraphQLObjectType({
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
    },
    createSession,
    updateSessionState,
    joinSession,
  },
});