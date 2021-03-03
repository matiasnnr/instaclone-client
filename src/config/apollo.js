import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

// const httpLink = createHttpLink({ para comenzar a usar grapghql
const httpLink = createUploadLink({ // para poder enviar archivos mediante graphql
    uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: httpLink
});

export default client;