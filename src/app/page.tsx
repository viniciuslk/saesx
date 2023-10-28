import { PubsList } from "@saesx/components/PubsList";
import {getServerSession} from "next-auth";
import {authConfig} from "@saesx/lib/auth";
import {CreatePubForm} from "@saesx/components/CreatePubForm";

export default async function Home() {
  const session = await getServerSession(authConfig)

  return (
    <div>
      <CreatePubForm user={session?.user as any} />
      <PubsList />
    </div>
  )
}
