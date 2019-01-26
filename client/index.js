import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { Router, Route } from 'react-router';

import App from './components/App';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
});

const Root = () => (
        <ApolloProvider client = {client}>
            <Router>
                <Route path ="/" component={App} />
            </Router>
        </ApolloProvider>
);

ReactDOM.render(
    <Root />,
    document.querySelector('#root'),
);
