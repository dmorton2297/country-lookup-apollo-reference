import { ApolloClient, InMemoryCache } from '@apollo/client';

const GqlClient = new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache()
});

export default GqlClient;