import {getFlags} from "@saesx/lib/flags";
import {CreatePubForm} from "@saesx/components/CreatePubForm";
import {getPubs} from "@saesx/services/PubService";
import {PubList} from "@saesx/components/PubList";
import {getServerSession} from "next-auth";
import {authConfig} from "@saesx/lib/auth";
import {Tab} from "@saesx/components/Tab";

export default async function Home({
 searchParams,
}: any) {
  const session = await getServerSession(authConfig)
  const flags = await getFlags({ user: { key: session?.user.id as string } });

  const pubs = await getPubs({
    onlyFollowing: searchParams.tab === "seguindo"
  })

  return (
    <main className="pb-8">
      <header
        className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
        <nav className="container w-full mx-auto sm:flex sm:items-center sm:justify-between"
             aria-label="Global">
          <div className="flex items-center justify-center">
            <a className="flex-none text-xl font-semibold" href="#">SAES-X</a>
          </div>
        </nav>
      </header>
      <div className="container md:mx-auto">
        <CreatePubForm />

        <div className="mt-10 mb-8 flex items-center gap-8">
          <Tab.Wrapper>
            <Tab.Item active={searchParams.tab === "todos"} href='?tab=todos' title="Todos" />
            <Tab.Item active={searchParams.tab === "seguindo"} href='?tab=seguindo' title="Seguindo" />
          </Tab.Wrapper>
        </div>

        <PubList pubs={pubs} canDelete={flags.flags?.can_delete_pub}/>
      </div>
    </main>
  )
}
