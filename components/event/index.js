import { useState } from 'react'
import { useUser } from '../UserContext'
import Input from '../ui/Input'
import Controls from './Controls'
import Handler from './Handler'
import Webhook from '../icons/Webhook'
import Subnav from '../ui/Subnav'

export default function Event ({ event }) {
  if (!event) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            Event not found.
          </p>
        </div>
      </section>
    )
  }

  return (
    <div className="bg-black">
      <Subnav app={{ id: event.application_id }} />
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <Title event={event} />
        <Handler event={event} />
        <Controls event={event} />
      </div>
    </div>
  )
}

const Title = ({ event }) => {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState()
  const { updateEvent } = useUser()

  const updateEventName = async () => {
    await updateEvent({
      id: event.id,
      name,
      application_id: event.application_id
    })
  }

  return (
    <section className="sm:flex sm:flex-col sm:align-center">
      <div className="flex justify-center">
        {!editMode
          ? (
          <h1 className="font-fine text-white text-3xl md:text-5xl">
            {name || event.name}
          </h1>
            )
          : (
          <Input
            type="text"
            defaultValue={name || event.name}
            onChange={setName}
          ></Input>
            )}
        <button
          className="m-2"
          onClick={() => {
            if (editMode) updateEventName()
            setEditMode(!editMode)
          }}
        >
          <i className="fas fa-edit p-2 text-accents-3 hover:text-accents-5 transform duration-200 ease-in-out"></i>
        </button>
      </div>
      <div className="flex flex-row items-center sm:text-center text-2xl max-w-2xl m-auto mt-2">
        <div className="m-1">
          <Webhook size={24} />
        </div>
        <p className="m-1 font-fine text-accents-6">{event.handler}</p>
      </div>
    </section>
  )
}
