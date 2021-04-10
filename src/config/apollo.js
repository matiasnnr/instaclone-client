import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'; // para poder envíar archivos a graphql
import { setContext } from 'apollo-link-context'; // para poder enviar el context a graphql
import { getToken } from '../utils/token';

// const httpLink = createHttpLink({ para comenzar a usar grapghql
const httpLink = createUploadLink({ // para poder enviar archivos mediante graphql
    // uri: 'http://localhost:4000/', // desarrollo
    uri: 'https://matiasnnr-instaclone-server.herokuapp.com/', // producción
});

const authLink = setContext((_, { headers }) => { // para enviar el token en las peticiones en caso de estar logueado
    const token = getToken();

    return {
        headers: {
            ...headers, // para tb enviar los datos que tiene el header previamente
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;