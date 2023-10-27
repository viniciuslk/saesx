import {Pub} from "@saesx/models/Pub";
import {supabase} from "@saesx/lib/supabase";

export async function getPubsRealtime(callback: ((pub: Pub) => void)): Promise<void> {
  supabase
    .channel('room1')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pubs'  }, (payload: any) => {
      callback({
        id: payload.new.id,
        text: payload.new.text,
        createdAt: new Date(payload.new.created_at),
        author: {
          id: payload.new.user_id,
          image: payload.new.user_picture_url,
          name: payload.new.user_name
        } as unknown as Author
      } as Pub)
    })
    .subscribe()
}
