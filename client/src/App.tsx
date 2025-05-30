<<<<<<< HEAD


import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
// import NewEntry from './pages/NewEntry';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
   <>
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      < Footer />
    </ApolloProvider>
   </>

     
=======
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
// import NewEntry from './pages/NewEntry';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      {/* <div>
        <h1>Welcome, User!</h1>
      </div> */}
      <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        {/* <Route path="/" element={<NewEntry />} /> */}
      </Routes>
      </Router>
    </>
>>>>>>> a2f4b6865dc58f55e397ac32254705c7960cc54c
  )
}

export default App