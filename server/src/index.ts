import { Users } from "@/gen/graphql-codegen";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import fetch from "cross-fetch";
import express from "express";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_HASURA_ENDPOINT,
    headers: {
      "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

const app = express();

app.get("/", async (req, res) => {
  const users = await client.query<Users>({ query: Users });
  res.send(JSON.stringify(users));
});

export const viteNodeApp = app;
