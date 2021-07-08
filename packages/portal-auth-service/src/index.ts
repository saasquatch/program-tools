require("dotenv").config();

import { ApolloServer, UserInputError } from "apollo-server-express";
import express from "express";

import { schema as typeDefs } from "./schema";
import resolvers from "./resolvers";
import { GraphQLJSONObject } from "graphql-type-json";
import { getPublicJWKS, initializeKeyStore } from "./util/JWKSKeyStore";
import { setLogLevel, LogLevel } from "./logger";
import http from "http";

export async function startServer() {
  const logger = setLogLevel((process.env.LOG_LEVEL as LogLevel) || "info");
  const app = express();
  const server = new ApolloServer({
    logger,
    typeDefs,
    resolvers: { JSONObject: GraphQLJSONObject, ...resolvers },
    context: ({ req }) => {
      const tenantAlias = req.params.tenant;
      return { tenantAlias };
    },
    formatError: (error) => {
      logger.error(`ERROR: ${error.extensions?.code} ${error.message}`);
      if (error.extensions?.code === "INTERNAL_SERVER_ERROR") {
        // remove information from 500 level errors
        return new Error("Internal Server Error");
      }
      return error;
    },
    introspection: true,
  });
  await server.start();

  server.applyMiddleware({ app, path: "/tenant/:tenant/graphql" });

  await initializeKeyStore();
  app.get("/.well-known/jwks.json", (_req, res) => {
    res.json(getPublicJWKS());
  });

  let httpServer: http.Server;
  await new Promise<void>((resolve) => {
    httpServer = app.listen({ port: process.env.PORT || 4000 }, resolve);
  });
  logger.info(
    `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
      server.graphqlPath
    }`
  );
  const exit = async () => {
    await server.stop();
    await new Promise((resolve) => httpServer.close(resolve));
  };
  return { server, app, exit };
}

if (process.env.NODE_ENV !== "test") startServer();
