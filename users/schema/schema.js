const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
  {
    id: "1",
    firstName: "John Doe",
    age: 30,
  },
  {
    id: "2",
    firstName: "Jane Doe",
    age: 25,
  },
];

//table name
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

// if you are looking for a user, you will need to pass in the id in args and the return type is UserType
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //here wo go into database and we find the data we are looking for. Its the logic
        //args is the argument passed in the orginial query. Here args is the id

        /* return _.find(users, {
          id: args.id,
        });
        */

        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((response) => response.data);

        //why response.data? because axios nests the response data like {data:{firstName:"bill"}}
        // graphql doesnt know about this nested data object by axios, so we do response.data
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
