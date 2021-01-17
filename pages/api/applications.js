// import { supabaseAdmin } from '../../utils/initSupabaseAdmin'

const applications = async (req, res) => {
  if (req.method === 'POST') {
    return res.status(501).end('Method Not Implemented')
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default applications
