import {AuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {prisma} from "@saesx/lib/prisma";
import {User} from "@saesx/@types/next-auth";

export const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile: async (profile): Promise<User> => {
        let user = await prisma.user.findFirst({ where: { externalId: profile.id.toString() }})

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name ?? profile.email,
              image: profile.avatar_url,
              externalId: profile.id.toString()
            }
          })
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        } as User
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && token.uid) {
        session.user = await prisma.user.findFirst({ where: { id: token.uid }, include: { following: true }}) as User
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
}