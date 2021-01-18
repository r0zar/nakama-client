import { supabase } from '../../utils/initSupabase'
import Applications from '../../components/Applications'
import { useUser } from '../../components/UserContext'
import { useEffect, useState } from 'react'

export default function AppsPage () {
  const { getApplications } = useUser()
  const [apps, setApps] = useState([])
  useEffect(() => {
    getApplications().then((applications) => {
      setApps(applications)
    })
  }, [])
  return <Applications apps={apps} />
}

export async function getServerSideProps () {
  const { data: apps, error } = await supabase.from('applications').select('*')
  console.log(apps)
  if (error) console.error(error.message)

  return {
    props: {
      apps: apps ?? []
    }
    // Refetch and rebuild pricing page every minute.
    // revalidate: 60
  }
}
