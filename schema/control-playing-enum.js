const { GraphQLEnumType } = require("graphql/type/definition");

module.exports = new GraphQLEnumType({
  name: 'PlayingState',
  values: {
    PAUSE: {
      value: 0,
    },
    PLAY: {
      value: 1,
    },
  },
});