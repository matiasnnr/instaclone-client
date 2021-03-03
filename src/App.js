import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, decodeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';
import LoginForm from './components/Auth/LoginForm';

export default function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, [])

  const logout = () => {
    console.log('Cerrar sesión');
  }

  const setUser = (user) => {
    setAuth(user);
  }

  // useMemo compara los datos que vienen con los que tenemos, si son distintos lo actualiza, sino no hace nada y evitamos que el componente se vuelva a recargar
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }), [auth])

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {
          !auth ? <Auth /> : <Navigation />
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
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
