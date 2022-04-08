import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { Users } from "./Users";

function App() {
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: import.meta.env.VITE_HASURA_ENDPOINT,
      headers: {
        "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET,
      },
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={apolloClient}>
      <Users />
    </ApolloProvider>
  );
}

export default App;
