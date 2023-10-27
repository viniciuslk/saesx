'use server'

import {authConfig} from "@saesx/lib/auth";
import {prisma} from "@saesx/lib/prisma";
import {supabase} from "@saesx/lib/supabase";
import {getServerSession} from "next-auth";
import {Prisma} from ".prisma/client";
import PubWhereInput = Prisma.PubWhereInput;
import {User} from "@saesx/@types/next-auth";

interface GetFilters {
  onlyFollowing?: boolean
}

async function getSessionUser(): Promise<User | undefined> {
  const session = await getServerSession(authConfig)
  return session?.user
}

export async function createPub(text: string) {
  const user = await getSessionUser()

  const pub = await prisma.pub.create({
    data: {
      text: text,
      authorId: user?.id ?? '',
    }
  })

  await supabase
    .from('pubs')
    .insert({
      id: pub.id,
      text: pub.text,
      user_id: pub.authorId,
      user_name: user?.name,
      user_picture_url: user?.image
    })
}

export async function deletePub(pubId: string) {
  await prisma.pub.delete({
    where: {
      id: pubId
    }
  })

  await supabase.from('pubs').delete().eq('id', pubId)
}

export async function getPubs(filters: GetFilters) {
    const user = await getSessionUser()
    const where: PubWhereInput = {}

    if (filters.onlyFollowing) {
      where.authorId = {
        in: user?.following.map(u => u.id)
      }
    }

    const pubs = await prisma.pub.findMany({
      where,
      include: {
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return pubs.map(pub => ({
      ...pub,
      author: pub.author as unknown as Author
    }))
}