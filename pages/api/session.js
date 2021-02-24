import { setLoginSession } from '../../utils/session'
import jwt from 'jsonwebtoken'

export default async function login (req, res) {
  try {
    console.log('set login session cookie server side')
    const token = req.headers.authorization.substr(7)
    const session = jwt.verify(token, process.env.JWT_SECRET)
    await setLoginSession(res, session)
    res.status(200).send({ session })
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).end(error.message)
  }
}
