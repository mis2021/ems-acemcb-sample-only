import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema/index";
// import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolver/index";
// import { resolvers } from "../../graphql/resolver/resolvers";
import Cors from "micro-cors";

const cors = Cors();

// const apolloServer = new ApolloServer({typeDefs:newtypes  , resolvers:newresolversUn});
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method == "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
