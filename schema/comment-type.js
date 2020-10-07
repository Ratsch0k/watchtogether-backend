const {GraphQLObjectType, GraphQLNonNull, GraphQLString} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});