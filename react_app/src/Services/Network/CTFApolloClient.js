import ApolloClient from "apollo-boost";

const ctfApolloClient = new ApolloClient({
  uri: "/graphql/"
});

export default ctfApolloClient
