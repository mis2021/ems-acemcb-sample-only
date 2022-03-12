
import { join } from 'path';

const {buildSchema, printSchema} = require("graphql")
const {loadSchemaSync} = require("@graphql-tools/load")

const {GraphQLFileLoader} = require("@graphql-tools/graphql-file-loader");

// const typeDefsMerge = loadSchemaSync("./schema/**/*.graphql", {
const typeDefsMerge = loadSchemaSync("./**/*.graphql", {
// const typeDefsMerge = loadSchemaSync(join(__dirname, './schema/**/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
});

export const typeDefs = typeDefsMerge
// export const typeDefs = buildSchema(typeDefsMerge)