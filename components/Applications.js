import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '../components/UserContext'
import Button from './ui/Button'

export default function Applications ({ apps }) {
  const [loading] = useState(false)
  const router = useRouter()
  const { session, userLoaded, subscription, createApplication } = useUser()

  if (!session) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-3xl font-extrabold text-white sm:text-center sm:text-3xl">
            Sign in to get started.
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
            Applications
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto font-light">
            Create an app to work with serverless websockets.
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {apps.map((app) => {
            return (
              <div
                key={app.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2',
                  {
                    'border border-pink': subscription
                      ? app.name === subscription?.prices?.products.name
                      : app.name === 'Freelancer'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-white">
                    {app.name}
                  </h2>
                  <p className="mt-4 text-accents-5">{app.description}</p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={session && !userLoaded}
                    loading={loading}
                    onClick={() => router.push(`/apps/${app.id}`)}
                    className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            )
          })}
          <Button
            className={cn(
              'rounded-lg shadow-sm divide-y divide-accents-2 hover:bg-primary-2 cursor-pointer'
            )}
            onClick={async (e) => {
              try {
                const newApp = await createApplication()
                router.push(`/apps/${newApp.id}`)
              } catch (e) {
                console.error(e)
              }
            }}
          >
            <div className="p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                height="102px"
                width="102px"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </section>
  )
}
