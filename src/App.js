import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [auth, setAuth] = useState(undefined);

  return (
    <ApolloProvider client={client}>
      {
        !auth ? <Auth /> : <h1>Estás logueado</h1>
      }
      <ToastContainer
        position="top-right"
        autoClose={5000} // 5 seg
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}
