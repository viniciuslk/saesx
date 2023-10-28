'use client'

import React from "react";
import {supabase} from "@saesx/lib/supabase";
import {User} from "next-auth";

interface Props {
  user: User
}

export function CreatePubForm({ user }: Props) {
  const [text, setText] = React.useState<string>()

  async function handleCreatePub() {
    if (!text || text.length === 0) {
      return null
    }

    await supabase
      .from('pubs')
      .insert({
        text,
        user_name: user.name,
        user_id: 'id',
        user_picture_url:
        user.image
      })

    setText('')
  }

  return (
    <div>
      <textarea placeholder="Insira seus pensamentos..." rows={3} value={text} onChange={e => setText(e.target.value!)} />
      <button onClick={handleCreatePub}>Publicar</button>
    </div>
  )
}