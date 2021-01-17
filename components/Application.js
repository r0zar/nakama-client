import cn from 'classnames'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import { postData } from '../utils/helpers'
import { getStripe } from '../utils/initStripejs'
import { useUser } from './UserContext'
import Button from './ui/Button'

export default function Application ({ app }) {
  console.log(app)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { session, userLoaded, subscription } = useUser()

  if (!app) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            App not found.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            {app.name}
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            {app.provider}
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {app.events.map((event) => {
            return (
              <div
                key={app.id}
                className="rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2"
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-white">
                    {event.name}
                  </h2>
                  <p className="mt-4 text-accents-5">{event.description}</p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={session && !userLoaded}
                    loading={loading}
                    onClick={() => router.push(`/apps/${app.id}/events/1`)}
                    className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                  >
                    Configure
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
