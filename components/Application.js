import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from './UserContext'
import Subnav from './ui/Subnav'
import Button from './ui/Button'
import Switch from './ui/Switch'
import Input from './ui/Input'
import { isEmpty } from 'lodash'

export default function Application ({ app }) {
  const [loading] = useState(false)
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

  const deleteApp = async () => {
    await deleteApplication(app.id)
    router.back()
  }

  return (
    <section className="bg-black">
      <Subnav app={app} />
      {!isEmpty(app) && (
        <div className="max-w-6xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <AppTitle app={app} />
          <AppProvider app={app} />
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
                <i className="fas fa-trash"></i>
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
      )}
    </section>
  )
}

const AppTitle = ({ app }) => {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const { updateApplication } = useUser()

  const updateAppName = async () => {
    await updateApplication({ id: app.id, name })
  }

  return (
    <div className="sm:flex sm:flex-col">
      <div className="flex">
        {!editMode
          ? (
          <h1 className="text-5xl font-extrabold text-white">
            {name || app.name}
          </h1>
            )
          : (
          <Input
            type="text"
            defaultValue={name || app.name}
            onChange={setName}
          />
            )}
        <button
          className="mx-2 p-1"
          onClick={() => {
            if (editMode) updateAppName()
            setEditMode(!editMode)
          }}
        >
          <i className="fas fa-edit p-2 text-gray-600 hover:text-gray-200 transform duration-200 ease-in-out"></i>
        </button>
      </div>
    </div>
  )
}

const AppProvider = ({ app }) => {
  return (
    <div className="flex items-center text-accents-4 text-2xl my-1">
      <i className="fab fa-discord m-1"></i>
      <p className="m-1 font-fine max-w-2xl">{app.provider}</p>
    </div>
  )
}
