import { supabase } from '../../../utils/initSupabase';
import Application from '../../../components/Application';

export default function AppDetailPage({ app }) {
  return <Application app={app} />;
}

export async function getStaticProps(req) {
  const { data: app, error } = await supabase
    .from('applications')
    .select(`* where id=${req.params.id}`);
  if (error) console.log(error.message);

  return {
    props: {
      app: app[0] ?? {}
    },
    // Refetch and rebuild pricing page every minute.
    revalidate: 60
  };
}

export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true
  };
}
