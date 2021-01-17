import { supabase } from '../../../../../utils/initSupabase'
import Event from '../../../../../components/Event'

export default function EventDetailPage ({ event }) {
  return <Event event={event} />
}

export async function getStaticProps (req) {
  const { data: event, error } = await supabase
    .from('events')
    .select(`* where id=${req.params.event_id}`)
  if (error) console.log(error.message)

  return {
    props: {
      event: event[0] ?? {}
    },
    // Refetch and rebuild pricing page every minute.
    revalidate: 60
  }
}

export async function getStaticPaths () {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [
      { params: { id: '1', event_id: '1' } },
      { params: { id: '2', event_id: '2' } }
    ],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true
  }
}
