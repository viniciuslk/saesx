'use client'

import {ClickVoteComponent, ClickVoteProvider, LikeStyle, UpvoteStyle} from "@clickvote/react";
import {FiThumbsDown, FiThumbsUp} from "react-icons/fi";

interface Props {
  pubId: string,
  userId: string
}

export function Clickvote({ pubId, userId }: Props) {
  return (
    <ClickVoteProvider
      value={{
        apiUrl: process.env.NEXT_PUBLIC_CLICKVOTE_API_URL as string,
        publicKey: process.env.NEXT_PUBLIC_CLICKVOTE_KEY as string,
        userId: userId,
      }}
    >
      <div className="flex items-center gap-4">
        <ClickVoteComponent id="dislikes" voteTo={pubId}>
          {(props) => {
            return <div className="flex items-center gap-2 text-red-500 p-2 rounded-md hover:bg-red-100 transition-all" onClick={() => props.vote("single", 1)}>
              <FiThumbsDown />
              {props.total.count}
            </div>
          }}
        </ClickVoteComponent>
        <ClickVoteComponent id="likes" voteTo={pubId}>
          {(props) => {
            return <div className="flex items-center gap-2 text-green-500 p-2 rounded-md hover:bg-green-100 transition-all" onClick={() => props.vote("single", 1)}>
                <FiThumbsUp />
                {props.total.count}
              </div>
          }}
        </ClickVoteComponent>
      </div>
    </ClickVoteProvider>
  );
}