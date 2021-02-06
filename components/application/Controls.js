import { useRouter } from 'next/router'
import Button from '../ui/Button'
import Switch from '../ui/Switch'
import { useUser } from '../UserContext'

const Controls = ({ app }) => {
  const router = useRouter()
  const { updateApplication, deleteApplication } = useUser()

  const enableApp = async (e) => {
    await updateApplication({ id: app.id, enabled: e })
  }

  const deleteApp = async () => {
    await deleteApplication(app.id)
    router.back()
  }
  return (
    <section className="mt-8 m-1 flex justify-between">
      <div className="flex">
        <Button className="justify-self-start" onClick={deleteApp}>
          <i className="fas fa-trash"></i>
        </Button>
      </div>
      <div className="flex">
        <Button className="mr-8" onClick={() => router.back()}>
          Back
        </Button>
        <Switch onChange={(e) => enableApp(e)} defaultChecked={app.enabled} />
      </div>
    </section>
  )
}

export default Controls
