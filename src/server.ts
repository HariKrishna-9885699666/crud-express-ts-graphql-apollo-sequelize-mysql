import express from "express";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./types";
import employeeResolver from "./resolvers/employee";
import postResolver from "./resolvers/post";
import commentResolver from "./resolvers/comment";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

/**
 * Starts the server by creating an ApolloServer instance and configuring it with the provided typeDefs and resolvers.
 * The server is then added to an Express application, along with security middleware such as Helmet and CORS.
 * The server is started on port 4000 and the connection to the MySQL database is authenticated.
 *
 * @return {Promise<void>} A promise that resolves when the server is started and the database is authenticated.
 */
const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers: [employeeResolver, postResolver, commentResolver],
  });

  // adding Helmet to enhance your API's security
  app.use(helmet());

  // using bodyParser to parse JSON bodies into JS objects
  app.use(bodyParser.json());

  // enabling CORS for all requests
  app.use(
    cors({
      origin: function (origin: string | undefined, callback: Function) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (["http://localhost:3000"].indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
      allowedHeaders: "*",
      exposedHeaders: "*",
    })
  );

  const { url } = await startStandaloneServer(server, {
    context: async () => ({ sequelize }),
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);

  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the mysql database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
