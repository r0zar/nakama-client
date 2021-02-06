import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '../UserContext'
import Subnav from '../ui/Subnav'
import Button from '../ui/Button'
import Controls from './Controls'
import Input from '../ui/Input'
import { isEmpty } from 'lodash'
import Webhook from '../icons/Webhook'

export default function Application ({ app }) {
  const router = useRouter()
  const { createEvent } = useUser()

  return (
    <section className="bg-black">
      <Subnav app={app} />
      {!isEmpty(app) && (
        <div className="max-w-6xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <Title app={app} />
          <Provider app={app} />
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {app.events &&
              app.events.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            <Button
              className={cn(
                'rounded-lg shadow-sm divide-y divide-accents-2 hover:bg-primary-2 cursor-pointer text-gray-300 hover:text-gray-100 transform duration-200 ease-in-out'
              )}
              style={{ borderRadius: '0.5rem' }}
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
          <Controls app={app} />
        </div>
      )}
    </section>
  )
}

const EventCard = ({ event }) => {
  const router = useRouter()
  return (
    <div className="rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
      <div className="p-6">
        <h2 className="text-lg leading-6 font-thin text-white">{event.name}</h2>
        <div className="mt-4 text-accents-5 flex items-center">
          <div className="m-1">
            <Webhook size={18} />
          </div>
          <div className="font-fine">{event.description}</div>
        </div>
        <Button
          variant="slim"
          type="button"
          onClick={() =>
            router.push(`/apps/${event.application_id}/events/${event.id}`)
          }
          className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          Configure
        </Button>
      </div>
    </div>
  )
}

const Title = ({ app }) => {
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
          <i className="fas fa-edit p-2 text-accents-3 hover:text-accents-5 transform duration-200 ease-in-out"></i>
        </button>
      </div>
    </div>
  )
}

const Provider = ({ app }) => {
  return (
    <div
      className="flex items-center text-accents-4 text-2xl my-1"
      style={{ color: '#7289da' }}
    >
      <i className="fab fa-discord m-1"></i>
      <p className="m-1 font-fine max-w-2xl">{app.provider}</p>
    </div>
  )
}
