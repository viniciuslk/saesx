'use server'

import {prisma} from "@saesx/lib/prisma";
import {getServerSession} from "next-auth";
import {authConfig} from "@saesx/lib/auth";

export async function followUser(followingId: string) {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    return null
  }

  await prisma.user.update({
    data: {
      following: {
        connect: {
          id: followingId
        }
      }
    },
    where: {
      id: session.user.id
    }
  })
}

export async function unfollowUser(followingId: string) {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    return null
  }

  await prisma.user.update({
    data: {
      following: {
        disconnect: {
          id: followingId
        }
      }
    },
    where: {
      id: session.user.id
    }
  })
}