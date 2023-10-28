'use client'

import React from "react";
import {supabase} from "@saesx/lib/supabase";

export default function Home() {
  const [pubs, setPubs] = React.useState([])

  React.useEffect(() => {
    supabase
      .channel('saes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pubs'},
        (payload) => {
          setPubs(current => [payload.new, ...current])
        })
      .subscribe()
  }, [])

  return (
    <div>{pubs.map(pub => (
      <div key={pub.id}>{JSON.stringify(pub, null ,2)}</div>
    ))}</div>
  )
}
