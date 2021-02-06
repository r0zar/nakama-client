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
