import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
# schema defines structure of data (type definitions) 
# also defines queryable fields for every book in our data source
  type Book {
    title: String 
    author: String
  }

  # lists all available queries executable
  # e.g. returns array in this case
  type Query {
    books: [Book]
  }
`;

const books = [
  // ur data
  {
    title: "Title 1",
    author: "Author 1",
  },
  {
    title: "Title 2",
    author: "Author 2",
  },
];

const resolvers = {
  Query: {
    books: () => books, // retrieves data
  },
};

// construct apollo servers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// creates express app
// preps app to handle requests from clients
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }, // specifies port
});

console.log(`🚀 Server ready at: ${url}`);
