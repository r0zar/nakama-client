import cn from 'classnames'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import { postData } from '../utils/helpers'
import { getStripe } from '../utils/initStripejs'
import { useUser } from './UserContext'
import Dropdown from './ui/Dropdown'
import Button from './ui/Dropdown'
import Input from './ui/Input'
import Switch from './ui/Switch'

export default function Event ({ event }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState()
  const { session, userLoaded, subscription, updateEvent } = useUser()

  const setEvent = (e) => {
    event.key = e
  }

  const saveEvent = () => {
    updateEvent(event)
  }

  const updateEventName = async () => {
    await updateEvent({ id: event.id, name })
  }

  console.log(event)
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
    <section className="bg-black">
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <div className="flex justify-center">
            {!editMode
              ? (
              <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
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
              <i className="fas fa-edit p-2 text-gray-600 hover:text-gray-200 transform duration-200 ease-in-out"></i>
            </button>
          </div>
          <label className="self-end">
            off / on
            <Switch
              onChange={(e) => (event.enabled = e)}
              defaultChecked={event.enabled}
            />
          </label>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            {event.description}
          </p>
        </div>
        <div className="my-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
            <Dropdown defaultSelection={event.key} onUpdate={setEvent} />
          </div>
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
            <Input
              placeholder="https://send-a-webhook-to-this-url.com"
              defaultValue={event.webhook_url}
            />
          </div>
        </div>
        <div className="p-4 float-right flex">
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 hover:bg-primary-2 cursor-pointer w-max">
            <button onClick={() => router.back()}>Back</button>
          </div>
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 hover:bg-primary-2 cursor-pointer w-max">
            <button onClick={saveEvent}>Save</button>
          </div>
        </div>
      </div>
    </section>
  )
}
