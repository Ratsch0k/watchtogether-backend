const { GraphQLObjectType, GraphQLNonNull } = require("graphql");
const CommentType = require('../comment-type');

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    hello: {
      type: new GraphQLNonNull(CommentType),
      resolve() {
        return {message: 'Hello World!'};
      },
    }
  }),
});