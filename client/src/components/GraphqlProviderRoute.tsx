import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import useSWR from "swr";

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: import.meta.env.VITE_HASURA_ENDPOINT,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export const GraphqlProviderRoute = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getToken = () => getAccessTokenSilently({ detailedResponse: true });
  const { data: token } = useSWR("token", getToken, { suspense: true });

  if (!token) {
    return <Outlet />;
  }
  return (
    <ApolloProvider client={createApolloClient(token.id_token)}>
      <Outlet />
    </ApolloProvider>
  );
};
