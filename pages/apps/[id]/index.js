import { supabase } from '../../../utils/initSupabase'
import Application from '../../../components/Application'
import { useUser } from '../../../components/UserContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AppDetailPage () {
  const router = useRouter()
  const { getApplication } = useUser()
  const [app, setApp] = useState([])
  useEffect(() => {
    getApplication(router.query.id).then((application) => {
      setApp(application)
    })
  }, [router.query.id])
  return <Application app={app} />
}
