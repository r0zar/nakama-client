import cn from 'classnames'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import { postData } from '../utils/helpers'
import { getStripe } from '../utils/initStripejs'
import { useUser } from './UserContext'
import Dropdown from './ui/Dropdown'
import Button from './ui/Button'
import Input from './ui/Input'
import Switch from './ui/Switch'

export default function Event ({ event }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState()
  const { session, userLoaded, subscription, updateEvent } = useUser()

  const setKey = (key) => {
    updateEvent({
      id: event.id,
      key: key
    })
  }

  const setWebhookURL = (url) => {
    updateEvent({
      id: event.id,
      webhook_url: url
    })
  }

  const updateEventName = async () => {
    await updateEvent({
      id: event.id,
      name,
      application_id: event.application_id
    })
  }

  const enableEvent = async (e) => {
    await updateEvent({
      id: event.id,
      enabled: e,
      application_id: event.application_id
    })
  }

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
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            {event.description}
          </p>
        </div>
        <div className="my-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
            <Dropdown defaultSelection={event.key} onChange={setKey} />
          </div>
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
            <Input
              placeholder="https://send-a-webhook-to-this-url.com"
              defaultValue={event.webhook_url}
              onBlur={setWebhookURL}
            />
          </div>
        </div>
        <div className="p-4 float-right flex">
          <Button className="mr-8" onClick={() => router.back()}>
            Back
          </Button>
          <Switch
            onChange={(e) => enableEvent(e)}
            defaultChecked={event.enabled}
          />
        </div>
      </div>
    </section>
  )
}
