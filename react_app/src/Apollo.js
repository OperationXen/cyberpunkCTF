import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default apolloClient