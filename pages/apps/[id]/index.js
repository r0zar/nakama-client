import { useUser } from '../../../components/UserContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Application from '../../../components/application'

export default function AppDetailPage () {
  const router = useRouter()
  const { getApplication } = useUser()
  const [app, setApp] = useState({})
  useEffect(() => {
    if (router.query.id) {
      getApplication(router.query.id).then((application) => {
        setApp(application)
      })
    }
  }, [router.query.id])
  return <Application app={app} />
}
