// src/App.tsx
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';     // from pages/Login/index.tsx
import Signup from './pages/Signup';   // from pages/Signup/index.tsx
import NewEntry from './pages/NewEntry';
import Journal from './pages/Journal';

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

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newentry" element={<NewEntry />} />
        <Route path="/journal" element={<Journal />} />
        {/* Add a fallback route if needed */}
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
