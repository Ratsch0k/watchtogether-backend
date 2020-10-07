const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql/type/definition");
const ControlStateType = require('./control-state-type');

module.exports = new GraphQLObjectType({
  name: 'Session',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    control: {
      type: new GraphQLNonNull(ControlStateType),
    },
  }),
});