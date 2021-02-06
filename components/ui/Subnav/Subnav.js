import Link from 'next/link'
import s from './Subnav.module.css'
import { useUser } from '../../UserContext'

const Subnav = ({ app }) => {
  const { user } = useUser()

  return (
    <nav className={s.root}>
      <div className="mx-auto max-w-6xl px-6">
        {user && app && (
          <div className="flex justify-between align-center flex-row py-2 relative z-10">
            <div className="flex flex-1 items-center">
              <nav className="space-x-2 hidden lg:block">
                <Link href={`/apps/${app.id}`}>
                  <a className={s.link}>Overview</a>
                </Link>
                <Link href={`/apps/${app.id}/settings`}>
                  <a className={s.link}>Settings</a>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Subnav
