import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

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
          const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
    
          if (credentials?.username == "hello" && credentials?.password == "hi") {
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
