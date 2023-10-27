'use client'

import React from "react";
import {Pub} from "@saesx/models/Pub";
import { getPubsRealtime } from "@saesx/services/PubRealtimeService";
import {PubListItem} from "@saesx/components/PubListItem";
import {deletePub} from "@saesx/services/PubService";

interface Props {
  pubs: Array<Pub>
  canDelete?: boolean
}

export function PubList(props: Props) {
  const { pubs: defaultPubs, canDelete } = props
  const [pubs, setPubs] = React.useState<Array<Pub>>(defaultPubs)

  React.useEffect(() => {
    getPubsRealtime(pub => {
      setPubs(current => [pub, ...current])
    })
  }, [])

  React.useEffect(() => {
    setPubs(defaultPubs)
  }, [defaultPubs])

  async function handleDeletePub(pubId: string) {
    await deletePub(pubId)
    setPubs(current => current.filter(pub => pub.id !== pubId))
  }

  return (
    <div className="space-y-4">
      {pubs.map((pub, index) => (
        <PubListItem onDelete={() => handleDeletePub(pub.id)} canDelete={!!canDelete} pub={pub} key={pub.id} />
      ))}
    </div>
  )
}