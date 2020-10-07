const {GraphQLObjectType} = require('graphql');
const pubsub = require('../pubsub');
const CommentType = require('../comment-type');

module.exports = new GraphQLObjectType({
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