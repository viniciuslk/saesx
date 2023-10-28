import {AuthOptions} from "next-auth";
import GithubProvider from 'next-auth/providers/github'

export const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET_KEY as string
    }),
  ]
}