import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// import { gql, useMutation } from "@apollo/client";
const LOGIN_USER = `
mutation UserLogin($username: String!, $password: String!) {
  userLogin(username: $username, password: $password) {
    username
    id
  }
}  
`;

const client = new ApolloClient({ 
uri: 'http://localhost:3000/api/graphql',
cache: new InMemoryCache()
});

export default NextAuth({

 
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // const [loginUser] = useMutation(LOGIN_USER);

          const creds = {
            username: credentials?.username,
            password: credentials?.password
          }

          const { data } = await client.mutate({
            mutation: gql`mutation UserLogin($username: String!, $password: String!) {userLogin(username: $username, password: $password) { username ,id, email, name}}`
            ,
            variables: { 
              username: credentials?.username,
              password: credentials?.password }
          });

          const user = { id: 1, name: data?.userLogin?.name, email: data?.userLogin?.email }

          // loginUser({
          //   variables: creds,
          // })
          //   .then(resp => {
          //     if(resp.data.userLogin.id){
          //       return user
          //     }
          //   })
          //   .catch(error => {
          //     return null
          //     console.info(error);
          //   });

       
    
          // if (credentials?.username == "hello" && credentials?.password == "hi") {
          //   return user
          // } else {
          //   return null
          // }
          
          if (data?.userLogin?.id) {
            return user
          } else {
            return null
          }
        }
      })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
})


// import NextAuth from "next-auth/next";
// import {Provider}  from "next-auth/providers";

// export default NextAuth({
//     providers:[
//         Provider.GitHub({
//             clientId: prrocess.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET
//         }),
//     ]
    
// })
