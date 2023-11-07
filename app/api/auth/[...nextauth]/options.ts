import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions:NextAuthOptions ={
    pages:{
signIn:'/'
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const username = credentials?.username
          const password = credentials?.password
  
          // Perform your custom authentication logic here
          if (username === 'admin' && password === 'adminpassword') {
            // Return a user object with the required 'id' property
            const user = { id: 'unique_user_id', username };
            return user;
          }
  
          // If authentication fails, return null
          return null;
        }
      })
      ]
}