import { useRouter } from 'next/router'
import Button from '../ui/Button'
import Switch from '../ui/Switch'
import { useUser } from '../UserContext'

const EventControls = ({ event }) => {
  const router = useRouter()
  const { deleteEvent, updateEvent } = useUser()

  const enableEvent = async (e) => {
    await updateEvent({
      id: event.id,
      enabled: e,
      application_id: event.application_id
    })
  }

  const _deleteEvent = async () => {
    await deleteEvent(event.id)
    router.back()
  }
  return (
    <section className="mt-8 m-1 flex justify-between">
      <div>
        <Button className="justify-self-start" onClick={_deleteEvent}>
          <i className="fas fa-trash"></i>
        </Button>
      </div>
      <div className="flex">
        <Button className="mr-8" onClick={() => router.back()}>
          Back
        </Button>
        <Switch
          onChange={(e) => enableEvent(e)}
          defaultChecked={event.enabled}
        />
      </div>
    </section>
  )
}

export default EventControls
