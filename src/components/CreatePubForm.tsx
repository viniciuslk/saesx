'use client'

import {createPub} from "@saesx/services/PubService";
import {Card} from "@saesx/components/Card";
import React from "react";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {Button} from "@saesx/components/Button";

export function CreatePubForm() {
  const [value, setValue] = React.useState<string>('')

  const session = useSession()

  function handleCreate(text: string) {
    if (!text || text.length === 0) {
      return
    }

    createPub(text).then(() => {
      setValue('')
    })
  }

  return (
    <Card.Wrapper>
      <Card.Content>
        <div className="flex gap-4">
          {session.data?.user?.image && (
            <Image
              width={80}
              height={80}
              className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800"
              src={session.data?.user?.image}
              alt="Image Description"
            />
          )}

          <textarea
            className="py-4 px-4 block w-full rounded-md text-sm outline-none"
            rows={3} placeholder="Compartilhe aqui suas ideias..." value={value as string}
            onChange={event => setValue(event.target.value as string)}
          />
        </div>
      </Card.Content>
      <Card.Actions>
        <div className="w-full flex justify-end">
          <Button.Solid onClick={() => handleCreate(value as string)}>Publicar</Button.Solid>
        </div>
      </Card.Actions>
    </Card.Wrapper>
  )
}