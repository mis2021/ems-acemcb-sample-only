import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import Cors from "micro-cors";


import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import * as glob from "glob";


// const pathToModules = path.join(__dirname, "../../graphql/modules");
// const graphqlTypes = glob
//   .sync(`${pathToModules}/**/schema.ts`)
//   .map((x) => fs.readFileSync(x, { encoding: "utf8" }));

// const resolversUn = glob
//   .sync(`${pathToModules}/**/resolvers.ts`)
//   .map((resolver) => require(resolver).resolvers);

//   const newtypes = makeExecutableSchema({typeDefs: graphqlTypes})
//   const newresolversUn = mergeResolvers(resolversUn)

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
