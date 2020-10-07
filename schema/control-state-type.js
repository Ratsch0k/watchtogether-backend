const { GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLEnumType } = require("graphql/type/definition");
const PlayingEnum = require('./control-playing-enum');

module.exports = new GraphQLObjectType({
  name: 'SessionState',
  fields: () => ({
    state: {
      type: new GraphQLNonNull(PlayingEnum)
    }
  }),
});