var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
// import { createApolloServer } from "./utils/graphql";
// import sequelize from "./config/database";
import helmet from "helmet";
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    // const apolloServer = createApolloServer();
    // await apolloServer.start();
    // apolloServer.applyMiddleware({ app });
    // adding Helmet to enhance your API's security
    app.use(helmet());
    app.listen({ port: 4000 }, () => 
    // console.log(
    //   `Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    // )
    console.log(`Server ready at http://localhost:4000`));
    try {
        // await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
startServer();
