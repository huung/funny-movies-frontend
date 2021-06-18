import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

import App from "./App";

const httpLink = createHttpLink({
  uri: "http://localhost:8000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
