import type { NextAuthOptions } from 'next-auth/index';

interface User {
  id: string
  name: string
  email: string
  password: string | null
  image: string | null
  externalId: string | null
  createdAt: Date
  following: Array<User>
  followedBy: Array<User>
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }
}