import { supabase } from '../../utils/initSupabase';
import Applications from '../../components/Applications';

export default function AppsPage({ apps }) {
  return <Applications apps={apps} />;
}

export async function getStaticProps() {
  const { data: apps, error } = await supabase.from('applications').select('*');
  if (error) console.log(error.message);

  return {
    props: {
      apps: apps ?? []
    },
    // Refetch and rebuild pricing page every minute.
    revalidate: 60
  };
}
