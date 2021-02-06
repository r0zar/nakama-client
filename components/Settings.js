import { isEmpty } from 'lodash'
import Input from './ui/Input'
import Subnav from './ui/Subnav'
import { useUser } from './UserContext'

export default function Settings ({ app }) {
  const { updateApplication } = useUser()

  const updateToken = async (t) => {
    await updateApplication({ id: app.id, token: t })
  }

  return (
    <section className="bg-black">
      <Subnav app={app} />
      {!isEmpty(app) && (
        <>
          <div className="max-w-6xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col">
              <h1 className="text-5xl font-extrabold text-white">Settings</h1>
            </div>
          </div>
          <div className="mt-5 text-xl text-accents-6 max-w-5xl m-auto">
            <div className="my-4 font-thin">API Token</div>
            <Input
              type="text"
              defaultValue={app.token}
              placeholder="Discord API Bot token"
              onChange={updateToken}
            ></Input>
          </div>
        </>
      )}
    </section>
  )
}
