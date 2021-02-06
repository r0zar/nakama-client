import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from './UserContext'
import Button from './ui/Button'
import Switch from './ui/Switch'
import Input from './ui/Input'

export default function Application ({ app }) {
  const [loading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()
  const {
    session,
    userLoaded,
    createEvent,
    updateApplication,
    deleteApplication
  } = useUser()

  const enableApp = async (e) => {
    await updateApplication({ id: app.id, enabled: e })
  }

  const updateAppName = async () => {
    await updateApplication({ id: app.id, name })
  }

  const updateToken = async (t) => {
    await updateApplication({ id: app.id, token: t })
  }

  const deleteApp = async () => {
    await deleteApplication(app.id)
    router.back()
  }

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
          <div className="flex justify-center">
            {!editMode
              ? (
              <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                {name || app.name}
              </h1>
                )
              : (
              <Input
                type="text"
                defaultValue={name || app.name}
                onChange={setName}
              ></Input>
                )}
            <button
              className="m-2"
              onClick={() => {
                if (editMode) updateAppName()
                setEditMode(!editMode)
              }}
            >
              <i className="fas fa-edit p-2 text-gray-600 hover:text-gray-200 transform duration-200 ease-in-out"></i>
            </button>
          </div>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            {app.provider}
          </p>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            <Input
              type="text"
              defaultValue={app.token}
              onChange={updateToken}
            ></Input>
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {app.events &&
            app.events.map((event) => {
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
                      onClick={() =>
                        router.push(`/apps/${app.id}/events/${event.id}`)
                      }
                      className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              )
            })}
          <Button
            className={cn(
              'rounded-lg shadow-sm divide-y divide-accents-2 hover:bg-primary-2 cursor-pointer text-gray-300 hover:text-gray-100 transform duration-200 ease-in-out'
            )}
            onClick={async (e) => {
              try {
                const newEvent = await createEvent(app.id)
                router.push(`/apps/${app.id}/events/${newEvent.id}`)
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
        <div className="mt-8 m-1 flex justify-between">
          <div>
            <Button className="justify-self-start" onClick={deleteApp}>
              <i className="fas fa-trash text-red"></i>
            </Button>
          </div>
          <div className="flex">
            <Button className="mr-8" onClick={() => router.back()}>
              Back
            </Button>
            <Switch
              onChange={(e) => enableApp(e)}
              defaultChecked={app.enabled}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
