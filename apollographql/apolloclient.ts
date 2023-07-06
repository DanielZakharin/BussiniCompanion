import { ApolloClient, InMemoryCache } from '@apollo/client';
import env from '../env/env';



export default new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    cache: new InMemoryCache(),
    headers: {
        'digitransit-subscription-key': env().apiKey
    }
  })