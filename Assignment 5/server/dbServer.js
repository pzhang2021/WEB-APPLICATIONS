import { ApolloServer } from "@apollo/server";
import { mongoose } from "mongoose";
import url from "./config/mongodb.config.js";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

// ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
