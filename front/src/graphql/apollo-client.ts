import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})
