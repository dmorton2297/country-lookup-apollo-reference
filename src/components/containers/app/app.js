
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import GqlClient from '../../../apollo/client';
import AppBar from '../../core/app-bar';
import Home from '../home';

const App = () => {
  return (
    <ApolloProvider client={GqlClient}>
      <div className="App">
        <AppBar />
        <Home />
      </div>
    </ApolloProvider>

  );
};

export default App;
