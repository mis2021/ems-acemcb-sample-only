const {mergeResolvers} = require("@graphql-tools/merge")
const {loadFilesSync} = require("@graphql-tools/load-files")
const path = require("path")

const noteResolver = require("./dir/notes.resolver") 
const linkResolver = require("./dir/links.resolver") 
const userResolver = require("./dir/user.resolver") 

//  const resolversNew = loadFilesSync(path.join(__dirname, "./dir"));
//  const resolversNew = loadFilesSync(path.join(process.cwd(), "./**/*.resolver.*"));
//  const resolversNew = loadFilesSync(path.join(__dirname, "./dir/*.resolver.ts"));
//  const resolversNew = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));
// export const resolvers = mergeResolvers(resolversNew);
export const resolvers = mergeResolvers([
    noteResolver, 
    linkResolver,
    userResolver
]);