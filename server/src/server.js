const {typeDefs} = require("./graphql/typeDefs")
const {resolvers} = require("./graphql/resolvers")
const {ApolloServer} = require("apollo-server")

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
console.log(`App is running At : ${url}`);
});