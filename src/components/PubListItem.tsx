import {Pub} from "@saesx/models/Pub";
import {Card} from "@saesx/components/Card";
import Image from "next/image";
import React from "react";
import {Typography} from "@saesx/components/Typography";
import humanDate from "human-date";
import {CardActions} from "@saesx/components/Card/Actions";
import {Button} from "@saesx/components/Button";
import {Clickvote} from "@saesx/components/Clickvote";
import {followUser, unfollowUser} from "@saesx/services/UserService";
import {useSession} from "next-auth/react";

interface Props {
  pub: Pub
  canDelete: boolean
  onDelete: () => void
}

export function PubListItem(props: Props) {
  const { pub, onDelete, canDelete, ...restProps } = props

  const session = useSession()
  const [alreadyFollowingAuthor, setAlreadyFollowingAuthor] = React.useState(false)

  async function handleFollow() {
    await followUser(pub.author.id)
    setAlreadyFollowingAuthor(true)
  }
  async function handleUnfollow() {
    await unfollowUser(pub.author.id)
    setAlreadyFollowingAuthor(false)
  }

  React.useEffect(() => {
    if (!session?.data?.user) return

    setAlreadyFollowingAuthor(session?.data?.user?.following.some(user => user.id === pub.author.id))
  }, [pub.author.id, session])

  return (
    <Card.Wrapper {...restProps}>
      <Card.Content>
        <div className="flex items-start gap-4 mb-4">
          <Image
            width={80}
            height={80}
            className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800"
            src={pub.author.image!}
            alt="Image Description"
          />

          <div className="mr-4">
            <Typography size="large">
              {pub.author.name}

              <span className="pl-4">
                {!alreadyFollowingAuthor && !!session.data?.user ? (
                  <Button.Solid onClick={handleFollow} color="neutral" size="small">
                    Seguir
                  </Button.Solid>
                ) : (
                  <Button.Text onClick={handleUnfollow} color="error" size="small">
                    Deixar de seguir
                  </Button.Text>
                )}
              </span>
            </Typography>
            <Typography size="small" color="text-neutral-500">
              {humanDate.relativeTime(pub.createdAt)}
            </Typography>
          </div>
        </div>
        <Typography>{pub.text}</Typography>
      </Card.Content>
      <CardActions>
        <div className="flex justify-between w-full">
          <div>
            {canDelete && (
              <Button.Text onClick={onDelete} color="error">Excluir post</Button.Text>
            )}
          </div>
          <Clickvote pubId={pub.id} userId={session.data?.user?.id ?? ''} />
        </div>
      </CardActions>
    </Card.Wrapper>
  )
}