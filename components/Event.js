import cn from 'classnames'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import { postData } from '../utils/helpers'
import { getStripe } from '../utils/initStripejs'
import { useUser } from './UserContext'
import Dropdown from './ui/Dropdown'
import Button from './ui/Dropdown'
import Input from './ui/Input'

export default function Event ({ event }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { session, userLoaded, subscription, updateEvent } = useUser()
  const setEvent = (e) => {
    event.key = e
  }
  const saveEvent = () => {
    console.log(event)
    updateEvent(event)
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
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            {event.name}
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            {event.description}
          </p>
        </div>
        <div className="my-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
            <Dropdown onUpdate={setEvent} />
          </div>
          <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
            <Input
              placeholder="https://send-a-webhook-to-this-url.com"
              defaultValue={event.webhook_url}
            />
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 hover:bg-primary-2 cursor-pointer float-right w-max">
          <button onClick={saveEvent}>Save</button>
        </div>
      </div>
    </section>
  )
}
